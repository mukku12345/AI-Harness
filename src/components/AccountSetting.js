import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { useApiKey } from './context';

function AccountSetting() {
    const getSecretValue = localStorage.getItem('secretKey')
    const [currentSubscriptionData, setCurrentSubscriptionData] = useState([])
    const [currentStartDate, setCurrentStartDate] = useState("");
    const [currentEndDate, setCurrentEndDate] = useState("")
    const [subscriptionList, setSubscriptionList] = useState([]);
    const [billingAndAccount, setBillandAccount] = useState("1")

    const api_key =useApiKey();

    useEffect(() => {
        getUserCurrentSubsriptionDetails();
        getListofSubscriptions()
    }, [])

    const getUserCurrentSubsriptionDetails = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": api_key

        }
        API.get(ApiEndPoint.GetCurrentSubscription, {
            headers: headers
        }).then((response) => {
            console.log('result GetCurrentSubscription', response);
            let data = response.data.message.data
            let currentstartdate = data.current_period_start * 1000
            let currentenddate = data.current_period_end * 1000

            const date1 = new Date(currentstartdate);
            const date2 = new Date(currentenddate);
            console.log(date1.toLocaleString());
            setCurrentStartDate(date1.toLocaleString());
            setCurrentEndDate(date2.toLocaleString())

            setCurrentSubscriptionData(data);
            console.log("data 123", data)
        })
            .catch((error) => {
                console.log('error', error);
            });

    }

    const getListofSubscriptions = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": api_key

        }
        API.get(ApiEndPoint.GetListofSubscription, {
            headers: headers
        }).then((response) => {
            console.log('resultlist of GetCurrentSubscription', response);
            let allsubscriptions = response.data.data.data
            console.log("allsubscriptions", allsubscriptions)
            setSubscriptionList(allsubscriptions)
        })
            .catch((error) => {
                console.log('error', error);
            });

    }

    const cancelSubscription = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": api_key

        }
        API.delete(ApiEndPoint.Cancelsubscription, {
            headers: headers
        }).then((response) => {
            console.log('Cancelsubscription response', response);

        })
            .catch((error) => {
                console.log('error', error);
            });
    }
    return (

        <div>

<div class="d-grid gap-4 d-md-block">
  <button class="btn btn-primary" type="button" onClick={() => { setBillandAccount("1") }}>Billing and Subscription</button>
  <button class="btn btn-primary" type="button" onClick={() => { setBillandAccount("2") }}>Account</button>
</div>
            {/* <div onClick={() => { setBillandAccount("1") }}>Billing and Subscription</div>
            <div onClick={() => { setBillandAccount("2") }}>Account</div> */}

            {billingAndAccount == 1 ? <div class="content">

                <div class="main" id="Subscription">
                    <h2>Active Subscription</h2>
                    <div class="card">
                        <div class="card-body">

                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Email</th>
                                        <th scope="col">Subscription ID</th>
                                        <th scope="col">Start Data</th>
                                        <th scope="col">End Data</th>
                                    </tr>
                                    </thead>

                                <tbody>

                                          <tr>
                                        <td>{localStorage.getItem('email')}</td>
                                        <td>{currentSubscriptionData.id}1</td>
                                        <td>
                                            {currentStartDate}2
                                        </td>
                                        <td>
                                            {currentEndDate}3
                                        </td>

                                    </tr>

                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
                <div>
                    <div class="main" id="Subscription">
                        <h2>All Subscriptions</h2>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">Subscription ID</th>
                                    <th scope="col">Status </th>

                                </tr>
                            </thead>
                            <tbody>
                                {subscriptionList && subscriptionList.map((item) => {
                                    return (
                                                <tr>
                                                    <td>{localStorage.getItem('email')}</td>
                                                    <td>{item.id}</td>
                                                    <td><span style={{ color: "green" }}>{item.status}</span></td>
                                                </tr>

                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>

            </div> : <div>
                
            <form action="" method="post" id="login" autocomplete="off" class="bg-light border p-3">
        <div class="form-row">
      
          <div class="col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fas fa-user"></i></span>
              </div>
              <input name="username" type="text" value="" class="input form-control" id="username" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fas fa-lock"></i></span>
              </div>
              <input name="password" type="password" value="" class="input form-control" id="password" placeholder="password" required="true" aria-label="password" aria-describedby="basic-addon1" />
              
            </div>
          </div>
       
         
          <div class="col-12">
            <button class="btn btn-primary" type="submit" name="signin">save</button>
          </div>
        </div>
      </form>
                
                
                
                
                
                
                
                </div>}
        </div>
    )
}

export default AccountSetting