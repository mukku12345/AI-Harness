import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
function AccountSetting() {
    const getSecretValue = localStorage.getItem('secretKey')
    const [currentSubscriptionData, setCurrentSubscriptionData] = useState([])
    const [currentStartDate, setCurrentStartDate] = useState("");
    const [currentEndDate, setCurrentEndDate] = useState("")
    const [subscriptionList, setSubscriptionList] = useState([])
    useEffect(() => {
        getUserCurrentSubsriptionDetails();
        getListofSubscriptions()
    }, [])

    const getUserCurrentSubsriptionDetails = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

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
            "openai": ApiEndPoint.OpenAIKey

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
            "openai": ApiEndPoint.OpenAIKey

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
        // <div>AccountSetting</div>
        <div>
            <SideBar />
            <div class="content">
                AccountSetting
                {/* <!-- Current Subscription -->? */}
                <div class="main" id="Subscription">
                    <h2>Current Active Subscription</h2>
                    <div class="card">
                        <div class="card-body">
                            <i class="fa fa-pen fa-xs edit"></i>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Subscription ID:</td>
                                        <td>:</td>
                                        <td>{currentSubscriptionData.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Start Data</td>
                                        <td>:</td>
                                        <td>
                                            {currentStartDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>End Data</td>
                                        <td>:</td>
                                        <td>
                                            {currentEndDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email: </td>
                                        <td>:</td>
                                        <td>naveen191@vibhuti.biz</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div>
                    <div class="main" id="Subscription">
                        <h2>All Subscription</h2>
                        {subscriptionList.map((item) => {
                            return (
                                <div class="card">
                                    <div class="card-body">
                                        <i class="fa fa-pen fa-xs edit"></i>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Subscription ID:</td>
                                                    <td>:</td>
                                                    <td>{item.id}</td>
                                                </tr>
                                                {/* <tr>
                                <td>Start Data</td>
                                <td>:</td>
                                <td>
                                   
                                </td>
                            </tr>
                            <tr>
                                <td>End Data</td>
                                <td>:</td>
                                <td>
                                
                                </td>
                            </tr> */}
                                                <tr>
                                                    <td>Email: </td>
                                                    <td>:</td>
                                                    <td>naveen191@vibhuti.biz</td>
                                                </tr>
                                                <tr>
                                                    <td>Status: </td>
                                                    <td>:</td>
                                                    <td><span style={{ color: "green" }}>{item.status}</span></td>
                                                </tr>
                                                <tr>
                                                    {(item.status == "active") ? <td><button class="btn " onClick={() => cancelSubscription()}>Cancel</button></td> : null}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default AccountSetting