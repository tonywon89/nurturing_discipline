import React from 'react';

class ConvictionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      id: props.conviction.id,
      title: props.conviction.title,
      detailed_description: props.conviction.detailed_description
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  delete(event) {
    event.preventDefault();
    this.props.deleteConviction(this.props.conviction.id);
  }

  edit(event) {
    event.preventDefault();
    this.setState((prevState, props) => {
      return { editing: !prevState.editing };
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ detailed_description: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editConviction(this.state);
  }

  render() {
    const conviction = this.props.conviction;
    const editing = this.state.editing;
    let editingForm = "";
    if (editing) {
      editingForm = (
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="_csrf" value={this.props.csrfToken}/>
          <input type="text" name="conviction_title" placeholder="Conviction Title" value={this.state.title} onChange={this.handleTitleChange}/><br />
          <textarea name="conviction_description" value={this.state.detailed_description} onChange={this.handleDescriptionChange}/> <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }

    return (
      <li className="conviction-item">

        <div>
          <a className="edit-conviction-button" onClick={this.delete.bind(this)}><i className="fa fa-times"></i></a>
          <a className="delete-conviction-button" onClick={this.edit.bind(this)}><i  className="fa fa-pencil"></i></a>
        </div>

        <div>
          <b className="conviction-title">{conviction.title}</b>
          <p className="conviction-detail">{conviction.detailed_description}</p>
        </div>


        {editingForm}
      </li>

      )
  }
}

export default ConvictionItem;
