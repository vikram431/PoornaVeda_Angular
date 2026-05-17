import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: Address;
}

export interface OrderItem {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private mockOrders: Order[] = [
    {
      id: 'PV-12543',
      date: '2026-05-10',
      total: 1299,
      status: 'Delivered',
      items: [
        { id: '1', productName: 'Artisanal Brass Diya', price: 899, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950' },
        { id: '2', productName: 'Pure Sandalwood Incense', price: 400, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1602853185549-98064d787010' }
      ],
      shippingAddress: {
        id: 'addr-1',
        name: 'Vikram Rai',
        street: 'Gali Number 1, Defence Colony Road',
        city: 'Gurugram',
        state: 'Haryana',
        zipCode: '122102',
        phone: '8395994937',
        isDefault: true
      }
    }
  ];

  private mockAddresses: Address[] = [
    {
      id: 'addr-1',
      name: 'Vikram Rai',
      street: 'Gali Number 1, Defence Colony Road',
      city: 'Gurugram',
      state: 'Haryana',
      zipCode: '122102',
      phone: '8395994937',
      isDefault: true
    }
  ];

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    console.log('ProfileService: Requesting user orders...');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>('http://localhost:8080/order/user', { headers }).pipe(
      map(backendOrders => {
        console.log('ProfileService: Received backend orders:', backendOrders);
        return backendOrders.map(bo => {
          // Map items
          const items: OrderItem[] = bo.orderItems ? bo.orderItems.map((oi: any) => ({
            id: oi.product?.id?.toString() || oi.id?.toString() || '1',
            productName: oi.product?.productName || 'Vedic Product',
            price: oi.price || 0,
            quantity: oi.quantity || 1,
            imageUrl: oi.product?.imageUrl || 'https://images.unsplash.com/photo-1601050690597-df0568f70950'
          })) : [];

          // Format date (bo.createdAt is an array [YYYY, MM, DD, HH, mm, ss] or string)
          let dateStr = '2026-05-17';
          if (bo.createdAt) {
            if (Array.isArray(bo.createdAt)) {
              const [year, month, day] = bo.createdAt;
              dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            } else {
              dateStr = bo.createdAt.toString().split('T')[0];
            }
          }

          // Map status
          let status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' = 'Pending';
          if (bo.orderStatus === 'DELIVERED') {
            status = 'Delivered';
          } else if (bo.orderStatus === 'SHIPPED') {
            status = 'Shipped';
          } else if (bo.orderStatus === 'CANCELLED') {
            status = 'Cancelled';
          }

          // Map Order
          return {
            id: 'PV-' + bo.id,
            date: dateStr,
            total: bo.totalAmount || 0,
            status: status,
            items: items,
            shippingAddress: bo.shippingAddress || {
              id: 'addr-1',
              name: bo.user?.fullName || 'Vikram Rai',
              street: 'Defence Colony Road',
              city: 'Gurugram',
              state: 'Haryana',
              zipCode: '122102',
              phone: bo.user?.phone || '8395994937',
              isDefault: true
            }
          };
        });
      }),
      catchError(err => {
        console.error('ProfileService: Error fetching user orders from server:', err);
        return of(this.mockOrders); // Fallback to mock orders so frontend never crashes
      })
    );
  }

  getOrderById(id: string): Observable<Order | undefined> {
    return this.getOrders().pipe(
      map(orders => orders.find(o => o.id === id))
    );
  }

  private mapToBackend(addr: Address): any {
    return {
      id: addr.id && !addr.id.startsWith('addr-') ? Number(addr.id) : null,
      fullName: addr.name,
      phone: addr.phone,
      addressLine1: addr.street,
      addressLine2: '',
      city: addr.city,
      state: addr.state,
      postalCode: addr.zipCode,
      country: 'India',
      addressType: 'SHIPPING',
      isDefault: addr.isDefault
    };
  }

  private mapToFrontend(backendAddr: any): Address {
    return {
      id: backendAddr.id.toString(),
      name: backendAddr.fullName,
      street: backendAddr.addressLine1,
      city: backendAddr.city,
      state: backendAddr.state,
      zipCode: backendAddr.postalCode,
      phone: backendAddr.phone,
      isDefault: backendAddr.isDefault
    };
  }

  private getUserId(): Observable<number> {
    const email = localStorage.getItem('emailId');
    if (!email) {
      console.warn('ProfileService: No emailId found in localStorage, falling back to userId 1.');
      return of(1);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('emailId', email);
    console.log('ProfileService: Fetching user details for email:', email);
    return this.http.get<any>('http://localhost:8080/user/userDetails', { headers, params }).pipe(
      map(res => {
        console.log('ProfileService: Fetched user details successfully. User ID:', res.id);
        return res.id || 1;
      }),
      catchError(err => {
        console.error('ProfileService: Error fetching user details, falling back to userId 1:', err);
        return of(1);
      })
    );
  }

  private generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getAddresses(): Observable<Address[]> {
    console.log('ProfileService: Request to get all addresses...');
    return this.getUserId().pipe(
      switchMap(userId => {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        const url = `http://localhost:8080/api/addresses/user/${userId}`;
        console.log(`ProfileService: GET addresses from: ${url}`);
        return this.http.get<any[]>(url, { headers });
      }),
      map(backendAddresses => {
        console.log('ProfileService: Raw addresses returned from backend:', backendAddresses);
        const mapped = backendAddresses.map(addr => this.mapToFrontend(addr));
        console.log('ProfileService: Mapped addresses:', mapped);
        return mapped;
      }),
      catchError(err => {
        console.error('ProfileService: Error fetching addresses from server, using mock data:', err);
        return of(this.mockAddresses);
      })
    );
  }

  addAddress(address: Address): Observable<Address> {
    const idempotencyKey = this.generateUUID();
    console.log('ProfileService: Request to add/update address:', address);
    return this.getUserId().pipe(
      switchMap(userId => {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Idempotency-Key': idempotencyKey
        });
        const backendBody = this.mapToBackend(address);
        const url = `http://localhost:8080/api/addresses/user/${userId}`;
        console.log(`ProfileService: POST address to: ${url}`, {
          payload: backendBody,
          idempotencyKey
        });
        return this.http.post<any>(url, backendBody, { headers });
      }),
      map(backendAddr => {
        console.log('ProfileService: Address saved successfully on backend:', backendAddr);
        return this.mapToFrontend(backendAddr);
      }),
      catchError(err => {
        console.error('ProfileService: Error saving address on backend:', err);
        throw err;
      })
    );
  }

  deleteAddress(id: string): Observable<boolean> {
    return this.getUserId().pipe(
      switchMap(userId => {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any>(`http://localhost:8080/api/addresses/user/${userId}/address/${id}`, { headers });
      }),
      map(() => true),
      catchError(err => {
        console.error('Error deleting address:', err);
        return of(false);
      })
    );
  }
}
