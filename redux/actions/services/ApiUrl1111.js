export default new class ApiUrl {
    get baseUrl() {
        return 'http://localhost/nanoAPI/';
    }


    //--- APPOINTMENT ---
    get appointmentDelete() {
        return this.baseUrl + '/doctor_appointment/delete';
    }

    get appointmentAdd() {
        return this.baseUrl + '/doctor_appointment/add';
    }

    get appointmentEdit() {
        return this.baseUrl + '/doctor_appointment/edit';
    }




}