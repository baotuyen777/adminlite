import 'whatwg-fetch';
// import ApiUrl from './ApiUrl'
//contain common service 
const ApiUrl = 'http://192.168.1.87/magento226/index.php/rest/V1/';
class Services {
    constructor(url) {
        this.serviceUrl = url;
        const user = JSON.parse(localStorage.getItem("authZ")) || null;
        if (user != null) {
            this.token = 'Bearer ' + user.token;
        }
    }

    delete(url, success, error) {
        fetch(ApiUrl + url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'token': this.token,
            },
        }).then(function (request) {

            return request.json();
        }).then((res) => {
            if (res.status == true) {
                if (success !== undefined && (typeof success === 'function')) {
                    success(res);
                }
                return;
            }
            if (failed !== undefined && typeof failed === 'function') {
                failed(res);
            }
        }).catch(function (ex) {
            if (error !== undefined && (typeof error === 'function')) {
                error(ex);
            }
        })
    }

    get(url, success, failed, error) {
        // const user = JSON.parse(localStorage.getItem("authZ")) || null;
        // if (user != null) {
        //     this.token = user.token;
        // }
        console.log(ApiUrl + url);
        fetch(ApiUrl + url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': this.token,
            },
        }).then((response) => {
            return response.json();
        }).then((res) => {
            if (res.items != undefined || res.id) {
                if (success !== undefined && typeof success === 'function') {
                    success(res);
                }
                return;
            }
            if (failed !== undefined && typeof failed === 'function') {
                failed(res);
            }
        }).catch((message) => {
            if (error !== undefined && (typeof error === 'function')) {
                error(message);
            }
        });
    }
    post(url, params, success, failed, error) {
        fetch(ApiUrl + url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token,
            },
            body: JSON.stringify(params)
        }).then((response) => {
            // let status=true;
            // let abc= response.json();
            // let result={
            //     status:'abc',
            //     response:response.json()
            // }
            // console.log(abc,333);
            // if (response.status !== 200) {
            //     status==false;
            //     failed(response.status);
            //     console.log(response.json(),555);
            //     return result;
            // }
            return response.json();
        }).then((res) => {
            console.log(res,444)
            if(res.message === undefined){
                success(res);
            }else{
                failed(res);
            }
        }).catch((message) => {
            if (error !== undefined && typeof error === 'function') {
                error(message);
            }
        });
    }
    //pass params and call back function success, error ( post form demo)
    put(url, params, success, error) {
        if (params) {
            // let form = new FormData();
            // for (const key in params) {
            //     form.append(key, params[key]);
            // }
            let body = '';
            let counter = 0;

            for (const key in params) {
                if (!counter) {
                    body = body + key + '=' + params[key];
                    counter++;
                    continue;
                }

                body = body + '&' + key + '=' + params[key];
            }
            fetch(ApiUrl + url, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'token': this.token,
                },
                body: body
            }).then(function (request) {
                return request.json();

            }).then(function (response) {
                if (success !== undefined && (typeof success === 'function')) {
                    success(response);
                }
            }).catch(function (ex) {
                if (error !== undefined && (typeof error === 'function')) {
                    error(ex);
                }
            })
        }

    }
    login(url, params, success, failed, error) {
        let form = new FormData();
        for (const key in params) {
            form.append(key, params[key]);
        }
        fetch(ApiUrl + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'token': this.token,
            },
            body: form
        }).then((response) => {
            return response.json();
        }).then((res) => {
            if (res.message == undefined) {
                if (success !== undefined && typeof success === 'function') {
                    success(res);
                    return;
                }
            }
            if ((failed !== undefined && typeof failed === 'function') || res.message.length) {
                failed(res);
                return;
            }

            return;
        }).catch((message) => {
            if (error !== undefined && typeof error === 'function') {
                error(message);
            }
        });
    }

}
export default new Services;