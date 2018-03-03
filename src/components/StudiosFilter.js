import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _throttle from 'lodash.throttle';
import { Form, Input, Tag, Slider } from 'antd';

const FormItem = Form.Item;
const { Search } = Input;

// const setStudiosFilterTextThrottled = _throttle(setStudiosFilterText, 1000, {
//   leading: true,
//   trailing: true
// });

// TODO: changeSearchTextDebounced = lo_debounce(this.handleSearchChange(e), 500);

class StudiosFilterForm extends Component {
  static propTypes = {
    addStudiosFilterTag: PropTypes.func.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    removeStudiosFilterTag: PropTypes.func.isRequired,
    setStudiosFilterText: PropTypes.func.isRequired,
    tags: PropTypes.instanceOf(Array).isRequired
  }
  setStudiosFilterTextThrottled = _throttle(
    this.props.setStudiosFilterText,
    1000,
    // NOTE: trailing causes excess setting of field value on search event
    { leading: false, trailing: true }
  )
  handleAfterClose = tagName => () => {
    const { removeStudiosFilterTag } = this.props;
    removeStudiosFilterTag(tagName);
  }
  handleSearch = (value) => {
    // TODO: cancel or flush throttled ?
    this.setStudiosFilterTextThrottled.cancel();
    const val = value.trim();
    if (!val || val.length < 1) {
      // TODO: use provided by lib validation
      return;
    }
    const { addStudiosFilterTag, setStudiosFilterText, form } = this.props;
    // console.log('search value: ', val);
    addStudiosFilterTag(val);
    setStudiosFilterText('');
    form.setFieldsValue({ search: '' }); // OR: form.resetFields('search');
  }
  handleSearchChange = (e) => {
    // const { setStudiosFilterText } = this.props;
    // NOTE: form.getFieldValue('search') returns prev value here
    console.log('on search change e.target.value: ', e.target.value);
    this.setStudiosFilterTextThrottled(e.target.value);
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const { form: { getFieldDecorator }, tags } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('search')(<Search
            onChange={this.handleSearchChange}
            onSearch={this.handleSearch}
            placeholder="Умный поиск"
          />)}
        </FormItem>
        <div>
          {tags.map((tag) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                name={tag}
                closable
                color="#3f7eff"
                // onClose={this.handleTagClose}
                afterClose={this.handleAfterClose(tag)}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            // return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            return tagElem;
          })}
        </div>
        <div style={{
            backgroundColor: '#fff',
            // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
            border: '1px solid #e8e8e8',
            borderRadius: 2,
            borderColor: 'rgba(0, 0, 0, 0.09)',
            padding: 16
          }}
        >
          <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <header>
              {'Стоимость'}
            </header>
            <summary>
              <span>
                {'1000'}
              </span>
              <span style={{ padding: '0 10px' }}>
                {' - '}
              </span>
              <span>
                {'12000'}
              </span>
            </summary>
          </div>
          <Slider
            defaultValue={[1000, 12000]}
            max={15000}
            min={0}
            range
            step={100}
            // onChange={onChange}
            // onAfterChange={onAfterChange}
          />
        </div>
      </Form>
    );
  }
}

export default Form.create({
  // onFieldsChange({ setStudiosFilterText }, changedFields) {
  //   console.log('changedFields.search.value: ', changedFields.search.value);
  //   setStudiosFilterText(changedFields.search.value);
  // },
  mapPropsToFields({ searchText }) {
    console.log('mapped searchText: ', searchText);
    return {
      search: Form.createFormField({
        value: searchText
      })
    };
  }
})(StudiosFilterForm);
