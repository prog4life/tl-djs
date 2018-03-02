import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tag } from 'antd';

const FormItem = Form.Item;
const { Search } = Input;


// changeSearchTextDebounced = lo_debounce(this.handleSearchTextChange(e), 500);

class StudiosFilterForm extends Component {
  static propTypes = {
    addStudiosFilterTag: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadStudios: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    studios: PropTypes.instanceOf(Object).isRequired,
    tags: PropTypes.instanceOf(Array).isRequired
  }
  handleStudioSearch = (value) => {
    if (typeof value !== 'string' || value.length < 1) {
      // TODO: show tooltip or
      return;
    }
    const { addStudiosFilterTag, setStudiosFilterText, form } = this.props;
    console.log(value);
    addStudiosFilterTag(value);
    form.resetFields('search');
    setStudiosFilterText('');
  }
  handleSearchTextChange = (e) => {
    console.log(e.target.value);
    const { setStudiosFilterText } = this.props;
    setStudiosFilterText(e.target.value);
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const {
      form: { getFieldDecorator, validateFields, resetFields },
      tags
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('search')(<Search
            onChange={this.handleSearchTextChange}
            onSearch={this.handleStudioSearch}
            placeholder="Умный поиск"
            // value={searchText}
          />)}
        </FormItem>
        <div>
          {tags.map((tag) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} afterClose={() => tag} closable>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            // return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            return tagElem;
          })}
        </div>
        {/* <FormItem label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </FormItem> */}
      </Form>
    );
  }
}

export default Form.create(
// {
//   onFieldsChange(props, changedFields) {
//     props.onChange(changedFields);
//   },
//   mapPropsToFields(props) {
//     return {
//       username: Form.createFormField({
//         ...props.username,
//         value: props.username.value,
//       }),
//     };
//   },
//   onValuesChange(_, values) {
//     console.log(values);
//   }
// }
)(StudiosFilterForm);
