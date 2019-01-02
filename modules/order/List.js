import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import { getAllOrder, deleteOrder, changeStatusOrder, addOrder, updateOrder } from '../../redux/actions/order'
import { getAllProduct } from '../../redux/actions/product';
import { getAllDate, changeStatusDate } from '../../redux/actions/date';

const user = JSON.parse(localStorage.getItem("authZ")) || null;
class List extends Component {
    constructor(props) {
        super(props);
        const { page } = props.params;
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        this.state = {
            items: null,
            total_count: null,
            isLoading: true,
            isDisabled: '',
            page_size: 1,
            orderId: null,
            listProduct: null,
            listDate: null,
            currentDateOrder: yyyy + '-' + mm + '-' + dd,
            dateStatus: false,
            totalPages: 1,
            currentPage: page || 1
        }
    }
    componentWillMount() {
        this.props.onGetAllOrder({ currentPage: this.state.currentPage });
    }
    componentWillReceiveProps(props) {
        this.props = props;
        const { listOrder: { data, type } } = props.order;
        const { page } = props.params;
        console.log(type);
        if (type === "ORDER_ALL_SUCCESS") {
            const { items, total_count, search_criteria: { page_size } } = data;
            let totalPages = Math.ceil(total_count / page_size);
            this.setState({
                items,
                total_count,
                page_size,
                totalPages
            });
        } else if (type === "ORDER_ALL_FAIL") {
            const { message } = data;
            this.setState({ message });
        }
        this.setState({ isLoading: false });

        //update data
        if (type === "ORDER_CHANGE_STATUS_SUCCESS") {
            this.props.onGetAllOrder({ currentPage: this.state.currentPage });
            this.setState({ isLoading: true });
        }
        // switch page
        if (page !== undefined && this.state.currentPage !== page) {
            this.setState({ isLoading: true, currentPage: page });
            this.props.onGetAllOrder({ currentPage: props.params.page });
        }
    }

    onDelete(id) {
        if (!id) {
            alert({ notice: 'ID invalid' });
            return;
        }
        var r = confirm("Are you sure ?");
        if (r) {
            this.props.onDelele(id);
            this.setState({ isLoading: true });
        }
    }

    onChangeStatus(entity_id, e, index) {
        let status = e.target.value;
        let increment_id = "100000000" + entity_id;
        let params = {
            entity: {
                entity_id,
                status,
                increment_id: increment_id.substring(entity_id.toString().length)
            }
        }
        this.props.onChangeStatus(params)
        this.setState({ isLoading: true });
    }
    renderList() {
        if (this.state.isLoading) {
            return (
                <div >
                    <center >
                        <div className="loading">
                            <i className="fa-spin fa fa-cog" aria-hidden="true"></i>
                        </div>
                    </center>
                </div>
            );
        }
        if (this.props.order.listOrder.type === 'ORDER_ALL_FAIL') {
            return (
                <div className="alert alert-danger">
                    <strong>Error!</strong> {this.state.message.replace("%resources", 'or token expire')}
                </div>
            )
        }
        let pageTag = [];
        for (var i = 1; i <= this.state.totalPages; i++) {
            pageTag.push(
                <li key={i} className={i == this.state.currentPage ? 'active' : ''}>
                    <Link to={"/order/page/" + i}>{i}</Link>
                </li>
            );
        }
        return (
            <div>
                <div className={this.state.message ? 'alert alert-success' : "hide"}>
                    <strong>Success!</strong> {this.state.message}
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer Name</th>
                            <th>Detail</th>
                            <th>Shipping fee</th>
                            <th>Purchase Date</th>
                            <th>Grand Total (Base)</th>
                            <th>Grand Total (Purchased)</th>
                            <th width="17%">Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((item, index) =>
                            <tr key={index} className="info">
                                <td>{item.entity_id}</td>
                                <td>{item.customer_firstname} {item.customer_lastname}</td>
                                <td>
                                    {
                                        item.items.map((product, index) =>
                                            <div key={index}>
                                                <div>
                                                    {product.name}( {product.price} {item.base_currency_code})<br />
                                                    Qty order: {product.qty_ordered}<br />
                                                    Row total: <strong>{product.row_total_incl_tax} {item.base_currency_code}</strong>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    }
                                </td>
                                <td>{item.base_shipping_incl_tax}{item.base_currency_code}</td>
                                <td>{item.updated_at}</td>
                                <td>{item.base_grand_total}</td>
                                <td>{item.grand_total}</td>

                                <td>
                                    <select value={item.status} onChange={(e) => this.onChangeStatus(item.entity_id, e, index)} className="form-control" >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="closed">Closed</option>
                                        <option value="holded">On hold</option>
                                        <option value="complete">Complete</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </td>
                                <td>
                                    <div>
                                        <button onClick={() => this.onDelete(item.orderId)}
                                            className="btn btn-danger"><i className="fa fa-trash" aria-hidden="true"></i></button> &nbsp;
                                        <button onClick={() => this.onUpdate(item.orderId)}
                                            className="btn btn-warning"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                                    </div>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
                <ul className="pagination">
                    {pageTag}
                </ul>
            </div>
        );
    }
    render() {
        return (
            <div className="relative">
                <div className="loading "></div>
                <div className="container">
                    <h1>Manage Orders</h1>
                    {this.renderList(this)}
                </div>
            </div >
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllOrder: (params) => dispatch(getAllOrder.bind(null, params)),
        onAddOrder: (params) => dispatch(addOrder.bind(null, params)),
        onDelele: (params) => dispatch(deleteOrder.bind(null, params)),
        onChangeStatus: (params) => dispatch(changeStatusOrder.bind(null, params)),
        onUpdateOrder: (id, params) => dispatch(updateOrder.bind(null, id, params)),
        onGetAllProduct: (params) => dispatch(getAllProduct.bind(null, params)),
        onGetAllDate: (params) => dispatch(getAllDate.bind(null, params)),
        onChangeStatusDate: (date, params) => dispatch(changeStatusDate.bind(null, date, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        order: state.order,
        product: state.product,
        date: state.date,
    })
    ,
    mapDispatchToProps
)(List)
