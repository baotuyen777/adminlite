import React, { Component } from 'react'
import {connect } from 'react-redux'
// import { getDataCity } from '../../../redux/actions/city'
import { Link, browserHistory } from 'react-router'
import { deleteCity } from '../../../redux/actions/city'
import { getDataCity } from '../../../redux/actions/city'
class List extends Component{
    constructor(props){
        super(props);
        const { page } =props;
        this.state={
            data:{},
            isDataReady:false,
            isDeleteLoading:false,
            loadingClass:'fa fa-cog fa-spin',
            totalPages:1,
            currentPage:page
        }
         this.props.onGetDataCity(page);
    }
    componentWillReceiveProps(props){
        
        const { data:{data,total_pages,current_page} } = props.cityListData;
        if(this.state.currentPage!==props.page){
            this.props.onGetDataCity(this.state.currentPage);
            this.setState({isDataReady:false});
        }
        this.setState({
            data,totalPages:total_pages,
            currentPage:props.page

        });
        setTimeout(()=>{this.setState({isDataReady:true})},1000);
        let success= props.deleteResult.data.success;
        if(success){
            if(this.state.isDeleteLoading){
                console.log(this.state.currentPage);
                this.props.onGetDataCity(this.state.currentPage);
                this.setState({isDeleteLoading:false});
            }
        }
    }
   onClickDelete(id){
       if(!id){
           this.setState({notice:'ID invalid'});
           return;
       }
       var r = confirm("Are you sure ?");
        if (r == true) {
             this.props.onDeleteCity(id);
             this.setState({isDeleteLoading:true,isDataReady:false});
        }

   }
    loadData(show){
        if(!show){
            return(
                  <div >
                  <center >
                    <div className="loading">
                        <i className={this.state.loadingClass}></i>
                    </div>
                  </center>
                  </div>
            );
        }
        let pageTag = [];
        console.log(this.state.currentPage)
        for (var i = 1; i < this.state.totalPages; i++) {
            let active = i==this.state.currentPage ? 'active' : '';
            pageTag.push(<li key={i} className={active}><Link to={"/city/page/"+i}>{i}</Link></li>);
        }
        return(
            <div>
                <button onClick={() => browserHistory.push('/city/add')} className="btn btn-default btn-success">Add new</button>
                <table className="table table-striped" id="listCity">
                    <thead>
                        <tr>
                        <th >Id</th>
                        <th >Name</th>
                        <th >Region</th>
                        <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map(city =>
                        <tr key={city.id}>
                            <td >{city.id}</td>
                            <td >{city.name}</td>
                            <td >{city.region.name}</td>
                            <td>
                                <button onClick={()=> this.onClickDelete(city.id)} className="btn btn-danger" ><i className="fa fa-times"></i></button>&nbsp;
                                <button onClick={()=> browserHistory.push('/city/id/'+city.id)} className="btn btn-warning"><i className="fa fa-pencil-square-o"></i></button>
                                
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <ul className="pagination">
                {pageTag}
                </ul>
            </div>
        )

    }
    render(){
        
        return(
            <div>
            {this.loadData(this.state.isDataReady)}
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return {
         onDeleteCity:(id)=> dispatch(deleteCity.bind(null,id)),
         onGetDataCity:(page)=> dispatch(getDataCity.bind(null,page))
        }
}
export default connect(
    (state,ownProps)=>({
        deleteResult: state.city.deleteCity,
        cityListData : state.city.cityList
    }),
    mapDispatchToProps
)(List)