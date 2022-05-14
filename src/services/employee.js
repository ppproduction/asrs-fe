const axios = require("axios");

class Employee {

    static baseUrl = "http://localhost:3001/api/" 

    static async createEmployee({ name, email, designation, phone }) {
        phone = phone.toString();
        return new Promise((resolve) => {
            const body = { name, email, designation, phone };
            axios.post(`${this.baseUrl}employee/`, body).then((val) => {
                resolve(val.data);
            }).catch((e) => {
                const err = JSON.parse(e.request.response);
                resolve(err);
            });
        })
    }

    static async getEmployee({ _id }) {
        return new Promise((resolve) => {
            axios.get(`${this.baseUrl}employee/${_id}`).then((val) => {
                resolve(val.data);
            }).catch((e) => {
                resolve(JSON.parse(e.request.response));
            });
        })
    }

    static async getEmployeeList({ page, limit, email, name, designation, phone }) {
        return new Promise((resolve) => {
            axios.get(`${this.baseUrl}employee?page=${page}&limit=${limit}${name ? '&name='+name : ''}`).then((val) => {
                resolve(val.data);
            }).catch((e) => {
                resolve(JSON.parse(e.request.response));
            });
        }) 
    }

    static async updateEmployee({ _id, name, email, designation, phone }) {
        phone = phone.toString();
        return new Promise((resolve) => {
            const body = { name, email, designation, phone };
            axios.patch(`${this.baseUrl}employee/${_id}`, body).then((val) => {
                resolve(val.data);
            }).catch((e) => {
                const err = JSON.parse(e.request.response);
                resolve(err);
            });
        })
    }

    static async deleteEmployee({ _id }) {
        console.log({ _id });
        return new Promise((resolve) => {
            axios.delete(`${this.baseUrl}employee/${_id}`).then((val) => {
                resolve(val.data);
            }).catch((e) => {
                resolve(JSON.parse(e.request.response));
            });
        })
    }

}

module.exports = { Employee };