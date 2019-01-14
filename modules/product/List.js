import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux'
import { getAllProduct, deleteProduct } from '../../redux/actions/product'

class List extends Component {
    constructor(props) {
        super(props);
        const { page } = props.params;
        this.state = {
            items: false,
            isLoading: true,
            is_success: true,
            message: '',
            currentPage: page || 1,
            totalPages: 1,
        }
    }
    componentWillMount() {
        this.props.onGetAllProduct({ currentPage: this.state.currentPage });
    }
    componentWillReceiveProps(props) {
        // const { listProduct: { type, data: { message, items, total_count, search_criteria: { page_size } } } } = props.product;
        const { result: { data, type } } = props.product;
        const { page } = props.params;
       
        if (type === "PRODUCT_ALL_SUCCESS") {
            const { items, total_count, search_criteria: { page_size } } = data;
            let totalPages = Math.ceil(total_count / page_size);
            this.setState({
                items,
                total_count,
                page_size,
                totalPages
            });
        }
        if (type === "PRODUCT_ALL_FAIL" || type === "PRODUCT_DELETE_FAIL") {
            const { message } = data;
            this.setState({ message, is_success: false })
        }
        this.setState({ isLoading: false });
        if (type === "PRODUCT_DELETE_SUCCESS") {
            this.props.onGetAllProduct({ currentPage: this.state.currentPage });
            this.setState({ isLoading: true, message: "Delete success" });
        }
        // switch page
        if (page !== undefined && this.state.currentPage !== page) {
            this.setState({ isLoading: true, currentPage: page });
            this.props.onGetAllProduct({ currentPage: props.params.page });
        }

    }
    onDelete(sku) {
        if (!sku) {
            alert({ notice: 'sku invalid' });
            return;
        }
        var r = confirm("Are you sure ?");
        if (r) {
            this.props.onDelele(sku);
            this.setState({ isLoading: true });
        }
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
        if (this.props.product.result.type === 'PRODUCT_ALL_FAIL') {
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
                    <Link to={"/product/page/" + i}>{i}</Link>
                </li>
            );
        }
        let mesClass = this.state.is_success ? 'alert-success' : 'alert-danger';
        return (
            <div>
                <div className={this.state.message ? 'alert ' + mesClass : "hide"}>
                    <strong>{this.state.is_success ? "Success" : "Error"}!</strong> {this.state.message}
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>Sku</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((item, index) =>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><img srcSet={this.getImageLink(item.custom_attributes)} height="50" /></td>
                                <td> <Link to={"/product/sku/" + item.sku}>{item.name}</Link></td>
                                <td>{item.sku}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td>{item.type_id}</td>
                                <td><button className="btn-danger" onClick={() => this.onDelete(item.sku)}><i className="fa fa-trash" aria-hidden="true"></i></button></td>
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
    getImageLink(custom_attributes) {
        let obj = custom_attributes.find(o => o.attribute_code === 'thumbnail');
        if (obj === undefined) {
            return '';
        }
        return "http://192.168.1.87/magento226/pub/media/catalog/product/" + obj.value;
    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">Product</h1>
                    <div className="action">
                        <button className="btn btn-success" onClick={() => browserHistory.push('/product/add')}>
                            <i className="fa fa-plus" aria-hidden="true"></i> Add new </button>
                    </div>
                    {this.renderList(this)}
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetAllProduct: (params) => dispatch(getAllProduct.bind(null, params)),
        onDelele: (params) => dispatch(deleteProduct.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        product: state.product,
    })
    ,
    mapDispatchToProps
)(List)