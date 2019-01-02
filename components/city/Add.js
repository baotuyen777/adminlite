import React, { Component } from 'react'
import List from './containers/List'
import {Header, Footer} from '../layout'
import { connect} from 'react-redux'
import { getRegion,addCity } from '../../redux/actions/city'
import { Link, browserHistory } from 'react-router'
class AddComponent extends Component{
     constructor(props){
        super(props);
        const {id}=this.props.params;
        this.props.onGetRegion();
        this.state={
            name:'',
            isSubmit:false,
            isDataReady:false,
            loadingClass:'fa fa-cog fa-spin',
            loadingSubmitClass:'',
            listRegion:[],
            notice:''
           
        }
    }
    componentWillReceiveProps(props){
        const {listRegion:{data},addCity } =props;
        this.setState({listRegion:data,isDataReady:true,loadingSubmitClass:''});
        if(addCity.data.success && this.state.isSubmit){
            var Router = require('react-router');
            Router.browserHistory.push('/city');
        }
    }
    onSubmit(e){
        const {name,region_id} =this.state;
        if(!name.trim() || !region_id.trim()){
            this.setState({notice:'Name or region not null !!'});
            return
        }
        this.props.onAddCity(name,region_id);
        this.setState({loadingSubmitClass:'fa fa-spinner fa-spin',isDisabled:'disabled'});
        this.setState({isSubmit:true})
    }
    loadData(show){
        if(!show){
            return(
                  <div className={this.state.pageLoading}>
                  <center >
                    <div className="loading">
                        <i className={this.state.loadingClass}></i>
                    </div>
                  </center>
                  </div>
            );
        }
        return(
            <div>
                <div className="error">{this.state.notice}</div>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">City Name:</label>
                        <div className="col-sm-10">
                        <input type="text" value={this.state.name} 
                            onChange={(e)=> this.setState({name:e.target.value})}
                            className="form-control" id="email" placeholder="City Name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2" htmlFor="email">Region:</label>
                        <div className="col-sm-10">
                            <select className="form-control"  onChange={(e)=> this.setState({region_id:e.target.value})} >
                                <option value="" >Please choose region</option>
                                {this.state.listRegion.map(region =>
                                <option key={region.id} value={region.id} >{region.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group"> 
                        <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" onClick={this.onSubmit.bind(this)} className="btn btn-default">
                        <i className={this.state.loadingSubmitClass}></i>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
    render(){
        const user=JSON.parse(localStorage.getItem("qsdkUser")) || null;
        if(user==null){
            setTimeout(()=>{var Router = require('react-router');
            Router.browserHistory.push('/login');},100)
        }
        return(
            <div>
            <Header data={user}/>
                <div className="container">
                <button onClick={() => browserHistory.push('/city')} className="btn btn-default">Back to list</button>
                    <h1>City Detail</h1>
                    {this.loadData(this.state.isDataReady)}
                </div>
            <Footer/>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return { onGetRegion:()=> dispatch(getRegion),
         onAddCity:(name,region_id)=> dispatch(addCity.bind(null,name,region_id))
        }
}

export default connect(
    (state, ownProps) =>({
        listRegion : state.city.getRegion,
        addCity: state.city.addCity
    }),
  mapDispatchToProps
)(AddComponent)