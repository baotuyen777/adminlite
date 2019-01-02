import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProduct, getProduct, deleteProduct, createProduct } from '../../redux/actions/product'
import { browserHistory, Link } from 'react-router';

class Add extends Component {
    constructor(props) {
        super(props)
        const { sku } = props.params;
        this.state = {
            sku,
            product: {
                name: '',
                sku: '',
                price: '',
                type_id: 'simple',
                attribute_set_id: 4,
                weight: 1,
                status: 1
            },
            file: '',
            imagePreviewUrl: '',
            isLoading: false,
            isEdit: ''
        }
    }
    componentWillMount() {
        let sku = this.state.sku;
        if (sku !== undefined) {
            this.props.onGetProduct({ sku });
            this.setState({ isLoading: true });
        }

    }
    componentWillReceiveProps(props) {
        const { listProduct: { type, data } } = props.product;
        const { message } = data;
        if (type === "PRODUCT_CREATE_SUCCESS") {
            browserHistory.push('/product');
        } else if (type === "PRODUCT_CREATE_FAIL") {
            console.log(message, 7788);
            this.setState({ message })
        }
        if (type === "PRODUCT_ONE_SUCCESS") {
            this.setState({
                product: data
            });
        } else if (type === "PRODUCT_ONE_FAIL") {
            this.setState({ message })
        }
        this.setState({ isLoading: false });
    }
    onChange(e) {
        let product = this.state.product;
        product[e.target.name] = e.target.value
        this.setState({ product });
    }
    onSubmit(e) {
        e.preventDefault();
        let { name, price, category, image } = this.state.product;

        if (!name || !price) {
            console.log('name, price not null');
            return;
        }

        let params = { product: this.state.product }
        this.setState({ isLoading: true });
        this.props.onCreate(params);

    }

    onChangeImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        let product = this.state.product;
        product[e.target.name] = file.name
        // this.setState({ product });

        reader.readAsDataURL(file)
    }
    renderNotify() {
        if (this.state.message) {
            return (
                <div className="alert alert-danger"><strong>Error!</strong> {this.state.message}</div>
            );
        }
    }
    renderForm() {
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
        if (this.props.product.listProduct.type === 'PRODUCT_ONE_FAIL') {
            return this.renderNotify();
        }
        // if (this.state.data === null) {
        //     return (
        //         <div >
        //             <center >
        //                 <div className="loading">
        //                     <i className="fa-spin fa fa-cog" aria-hidden="true"></i>
        //                 </div>
        //             </center>
        //         </div>
        //     );
        // }
        //   {this.notice(this.state.updateStatus, this.state.noticeText)}
        let { name, sku, price, type_id, attribute_set_id, category, description, image, status } = this.state.product;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img style={{ height: 100 }} src={imagePreviewUrl} />);
        }
        let messDom = '';
        return (
            <div>
                {this.renderNotify()}
                <form className="form-horizontal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Name:</label>
                        <div className="col-sm-10">
                            <input name='name' type="text" className="form-control" placeholder="Name"
                                value={name} onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Sku:</label>
                        <div className="col-sm-10">
                            <input name='sku' type="text" className="form-control" placeholder="Sku"
                                value={sku} onChange={(e) => this.onChange(e)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Price:</label>
                        <div className="col-sm-10">
                            <input name='price' type="number" className="form-control" placeholder="Price"
                                value={price} onChange={(e) => this.onChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Type:</label>
                        <div className="col-sm-10">
                            <select name="type_id" className="form-control"
                                value={type_id} onChange={(e) => this.onChange(e)}
                            >
                                <option value="">Please choose</option>
                                <option value="simple">Simple</option>
                                <option value="bundle">Bundle</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Attribute set:</label>
                        <div className="col-sm-10">
                            <select name="attribute_set_id" className="form-control"
                                value={attribute_set_id} onChange={(e) => this.onChange(e)}
                            >
                                <option value="">Please choose</option>
                                <option value="4">default</option>
                                <option value="14">Downloadable</option>
                            </select>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <label className="control-label col-sm-2" >Category:</label>
                        <div className="col-sm-10">
                            <select name="category" className="form-control"
                                value={category} onChange={(e) => this.onChange(e)}
                                >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </div>
                    </div> */}
                    {/* <div className="form-group">
                        <label className="control-label col-sm-2">Description:</label>
                        <div className="col-sm-10">
                            <textArea name="description" className="form-control"
                                onChange={(e) => this.onChange(e)}>{description}</textArea>
                        </div>
                    </div> */}
                    <div className="form-group">
                        <label className="control-label col-sm-2" >Image :</label>
                        <div className="col-sm-10">
                            <input type="file" name='image' className="form-control" onChange={(e) => this.onChangeImage(e)} />
                            <div >
                                {$imagePreview}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label><input type="checkbox" defaultChecked={status} /> Status   </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }
    render() {

        return (
            <div>
                <div className="container">

                    <h1 className="text-center">Product detail</h1>
                    <Link className="btn btn-default" to={"/product/"}><i className="fa fa-reply" aria-hidden="true"></i> List</Link>
                    {this.renderForm(this)}
                </div>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onSendDataLogin: (email, password) => dispatch(sendDataLogin.bind(null, email, password)),
        onGetProduct: (params) => dispatch(getProduct.bind(null, params)),
        onDelele: (params) => dispatch(deleteProduct.bind(null, params)),
        onCreate: (params) => dispatch(createProduct.bind(null, params)),
    }
}

export default connect(
    (state, ownProps) => ({
        auth: state.auth,
        product: state.product,
    })
    ,
    mapDispatchToProps
)(Add)