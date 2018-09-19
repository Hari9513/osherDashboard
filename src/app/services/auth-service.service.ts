import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl: string = 'http://localhost:8000/api/user/';
const dashboardusersUrl: string = 'http://localhost:8000/api/dashboardusers/';
const loginUrl: string = 'http://localhost:8000/api/login/';
const forgotUrl: string = 'http://localhost:8000/api/forgotpassword';
const passwordUrl: string = 'http://localhost:8000/api/updatepassword';
const stockUrll: string = 'http://localhost:8000/api/stock';
const emailUrl: string = 'http://localhost:8000/api/emailexist';
const phoneUrl: string = 'http://localhost:8000/api/phoneexist';
const stockStatus: string = 'http://localhost:8000/api/stockstatus';
const couponUrl: string = 'http://localhost:8000/api/coupon/';
const UserStatusUpdateUrl: string = 'http://localhost:8000/api/userstatusupdate';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( 
    private http: HttpClient
  ) { }

  forgot(user){
    return this.http.put(forgotUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  getCouponDetails(){
    return this.http.get(couponUrl)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  updateUserStatus(user){
    return this.http.post(UserStatusUpdateUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  generateCoupon(coupon){
    return this.http.post(couponUrl, coupon)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  upload(formData){
    return this.http.post(`${stockUrll}/upload`, formData)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  otpCheck(user){
    return this.http.post(forgotUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  phoneExist(user){
    return this.http.post(phoneUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  // updateStocks(stocks){
  //   console.log(stocks);
  //   return this.http.put(stockUrll, stocks)
  //   .toPromise()
  //   .then(data => {
  //     return data;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }

  
  updateStockStatus(user){
    console.log(user);
    return this.http.put(stockStatus, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  emailExist(user){
    return this.http.post(emailUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  addStock(stock){
    return this.http.post(stockUrll, stock)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  getAllStocks () {
    return this.http.get(stockUrll)
    .toPromise()
    .then((data: any) => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  getStockByID(stockID){
    console.log(stockID)
  	return this.http.get(stockUrll + `/${stockID}`)
  	.toPromise()
	.then(data => {
		return data;
	})
	.catch(error => {
		console.log(error);
	})
  }
  
  updateStockByID(stock){
    console.log(stock);
   return this.http.put(stockUrll + `/${stock.ID}`, stock)
   .toPromise()
 .then(data => {
   return data;
 })
 .catch(error => {
   console.log(error);
 })
 }
 
  newPassword(user){
    return this.http.put(passwordUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }
 
  login(user){
    return this.http.post(loginUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  registerUser(user){
    console.log(user);
    return this.http.post(dashboardusersUrl, user)
    .toPromise()
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    })
  }

  
  getDashboardUserDetails () {
    return this.http.get(dashboardusersUrl)
    .toPromise()
    .then((data: any) => {
      return data.results;
    })
    .catch(error => {
      console.log(error);
    })
  }

  getUserDetails () {
    return this.http.get(apiUrl)
    .toPromise()
    .then((data: any) => {
      return data.results;
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  getDashboardUserByID(user){
    console.log(user)
  	return this.http.get(dashboardusersUrl + `${user}`)
  	.toPromise()
	.then(data => {
		return data;
	})
	.catch(error => {
		console.log(error);
	})
  }
  
  getUserByID(user){
    console.log(user)
  	return this.http.get(apiUrl + `${user}`)
  	.toPromise()
	.then(data => {
		return data;
	})
	.catch(error => {
		console.log(error);
	})
  }

  updateUserByID(user){
    console.log(user);
   return this.http.put(apiUrl + `${user.id}`, user)
   .toPromise()
 .then(data => {
   return data;
 })
 .catch(error => {
   console.log(error);
 })
 }

 updateDashboardUserByID(user){
  console.log(user);
 return this.http.put(dashboardusersUrl + `${user.id}`, user)
 .toPromise()
.then(data => {
 return data;
})
.catch(error => {
 console.log(error);
})
}


 deleteUser(user){
  console.log(user);
 return this.http.delete(apiUrl + `${user.id}`)
 .toPromise()
.then(data => {
 return data;
})
.catch(error => {
 console.log(error);
})
}

deleteStock(stock){
  console.log(stock);
 return this.http.delete(stockUrll + `/${stock.id}`)
 .toPromise()
.then(data => {
 return data;
})
.catch(error => {
 console.log(error);
})
}

}
