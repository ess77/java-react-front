import React, { Component } from 'react';
import ApiService from '../services/ApiService';


export default class EditUserComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            age: '',
            salary: '',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res.data.result;
                this.setState({
                    id: user.id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    age: user.age,
                    salary: user.salary,
                });
            });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    saveUser(e) {
        e.preventDefault();
        let user = {
            id: this.state.id, 
            password: this.state.password, 
            firstname: this.state.firstname, 
            lastname: this.state.lastname,
            username: this.state.username,
            age: this.state.age,
            salary: this.state.salary,
        }
        ApiService.editUser(user)
            .then(res => {
                this.setState({ message: 'User ajouté avec succès!'});
                this.props.history.push('/users');
            });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Edit User</h2>
                <form>

                    <div className="form-group">
                        <label>User Name:</label>
                        <input type="text" placeholder="username" name="username" className="form-control" readonly="true" defaultValue={this.state.username}/>
                    </div>

                    <div className="form-group">
                        <label>First Name:</label>
                        <input placeholder="First Name" name="firstname" className="form-control" value={this.state.firstname} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Age:</label>
                        <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Salary:</label>
                        <input type="number" placeholder="salary" name="salary" className="form-control" value={this.state.salary} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                </form>
            </div>
        )
    }
}
