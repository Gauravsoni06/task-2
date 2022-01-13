var StudentAll = React.createClass({
  getInitialState: function () {
    return {
      name: "",
      address: "",
      email: "",
      contact: "",
      id: "",
      Buttontxt: "Save",
      data1: [],
    };
  },
  handleChange: function (e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  componentDidMount() {
    $.ajax({
      url: "api/getdata",
      type: "GET",
      dataType: "json",
      ContentType: "application/json",
      success: function (data) {
        this.setState({ data1: data });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }.bind(this),
    });
  },

  DeleteData(id) {
    var studentDelete = {
      id: id,
    };
    $.ajax({
      url: "/api/Removedata/",
      dataType: "json",
      type: "POST",
      data: studentDelete,
      success: function (data) {
        alert(data.data);
        this.componentDidMount();
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      }.bind(this),
    });
  },

  EditData(item) {
    this.setState({
      name: item.name,
      address: item.address,
      contact: item.contact,
      email: item.email,
      id: item._id,
      Buttontxt: "Update",
    });
  },

  handleClick: function () {
    var Url = "";
    if (this.state.Buttontxt == "Save") {
      Url = "/api/savedata";
    } else {
      Url = "/api/Updatedata";
    }
    var studentdata = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      contact: this.state.contact,
      id: this.state.id,
    };
    $.ajax({
      url: Url,
      dataType: "json",
      type: "POST",
      data: studentdata,
      success: function (data) {
        alert(data.data);
        this.setState(this.getInitialState());
        this.componentDidMount();
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      }.bind(this),
    });
  },

  render: function () {
    return (
      <div className="container " >
        <p className="text-center" style={{ fontSize: "50px" }}>
          <b>Student Record Management System</b>
        </p>
        <form>
          <div className="col-sm-12 col-md-12" style={{margin:"auto"}}>
            <table className="table-bordered container1" style={{margin:"auto"}}>
              <tbody >
                <tr>
                  <td style={{padding:"10px"}}>
                    <b>Name</b>
                  </td>
                  <td style={{padding:"10px"}}>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.name}
                      name="name"
                      onChange={this.handleChange}
                    />
                    <input type="hidden" value={this.state.id} name="id" />
                  </td>
                </tr>

                <tr>
                  <td style={{padding:"10px"}}>
                    <b>Address</b>
                  </td>
                  <td style={{padding:"10px"}}>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.address}
                      name="address"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td style={{padding:"10px"}}>
                    <b>Email</b>
                  </td>
                  <td style={{padding:"10px"}}>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      name="email"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td style={{padding:"10px"}}>
                    <b>Contact</b>
                  </td>
                  <td style={{padding:"10px"}}>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.contact}
                      name="contact"
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td style={{padding:"10px"}}>
                    <input
                      className="btn btn-primary"
                      type="button"
                      value={this.state.Buttontxt}
                      onClick={this.handleClick}
                      
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className="col-sm-12 col-md-12 "
            style={{ marginTop: "50px" }}
          >
            <table className="table-bordered">
              <tbody>
                <tr>
                  <th style={{padding:"10px"}}>
                    <b>S.No</b>
                  </th>
                  <th style={{padding:"10px"}}>
                    <b>NAME</b>
                  </th>
                  <th style={{padding:"10px"}}>
                    <b>ADDRESS</b>
                  </th>
                  <th style={{padding:"10px"}}>
                    <b>EMAIL</b>
                  </th>
                  <th style={{padding:"10px"}}>
                    <b>CONTACT</b>
                  </th>
                  <th style={{padding:"10px"}}>
                    <b>Edit</b>
                  </th>
                  <th style={{padding:"10px"}}>
                    <b>Delete</b>
                  </th>
                </tr>
                {this.state.data1.map((item, index) => (
                  <tr key={index}>
                    <td style={{padding:"10px"}}>{index + 1}</td>
                    <td style={{padding:"10px"}}>{item.name}</td>
                    <td style={{padding:"10px"}}>{item.address}</td>
                    <td style={{padding:"10px"}}>{item.email}</td>
                    <td style={{padding:"10px"}}>{item.contact}</td>
                    <td style={{padding:"10px"}}>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={(e) => {
                          this.EditData(item);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td style={{padding:"10px"}}>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={(e) => {
                          this.DeleteData(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  },
});

ReactDOM.render(<StudentAll />, document.getElementById("root"));
