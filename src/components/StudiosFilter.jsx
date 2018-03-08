import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _throttle from 'lodash.throttle';
import { Form, Input } from 'antd';
import FilteringSlider from 'components/FilteringSlider';
import TagList from 'components/TagList';

const FormItem = Form.Item;
const { Search } = Input;

// TODO: changeSearchTextDebounced = _debounce(this.handleSearchChange(e), 500);

class StudiosFilterForm extends Component {
  static propTypes = {
    addFilterTag: PropTypes.func.isRequired,
    basePriceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    removeFilterTag: PropTypes.func.isRequired,
    setFilterRange: PropTypes.func.isRequired,
    setFilterText: PropTypes.func.isRequired,
    tags: PropTypes.instanceOf(Array).isRequired,
  }
  setFilterTextThrottled = _throttle(
    this.props.setFilterText,
    1000,
    // NOTE: trailing causes excess setting of field value on search event
    { leading: false, trailing: true }
  )
  handleTagAfterClose = tagName => () => {
    const { removeFilterTag } = this.props;
    removeFilterTag(tagName);
  }
  handleSliderChange = ([minPrice, maxPrice]) => {
    const { setFilterRange } = this.props;
    console.log('slider value: ', minPrice, maxPrice);
    setFilterRange(minPrice, maxPrice);
  }
  handleSearch = (value) => {
    // TODO: cancel or flush throttled ?
    this.setFilterTextThrottled.cancel();
    const val = value.trim();
    if (!val || val.length < 1) {
      // TODO: use provided by lib validation
      return;
    }
    const { addFilterTag, setFilterText, form } = this.props;
    // console.log('search value: ', val);
    addFilterTag(val);
    setFilterText('');
    form.setFieldsValue({ search: '' }); // OR: form.resetFields('search');
  }
  handleSearchChange = (e) => {
    // const { setFilterText } = this.props;
    // NOTE: form.getFieldValue('search') returns prev value here
    console.log('on search change e.target.value: ', e.target.value);
    this.setFilterTextThrottled(e.target.value);
  }
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const { form: { getFieldDecorator }, tags, basePriceRange } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('search')(
            <Search
              // onChange={this.handleSearchChange}
              onSearch={this.handleSearch}
              placeholder="Умный поиск!"
            />)
          }
          <TagList onAfterClose={this.handleTagAfterClose} tags={tags} />
        </FormItem>
        <FilteringSlider
          baseRange={basePriceRange}
          onChange={this.handleSliderChange}
        />
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange: _throttle(
    ({ setFilterText }, changedFields) =>
    // console.log('changedFields.search.value: ', changedFields.search.value);
      setFilterText(changedFields.search.value),
    1000,
    { leading: true, trailing: true },
  ),
  // mapPropsToFields({ searchText }) {
  //   console.log('mapped searchText: ', searchText);
  //   return {
  //     search: Form.createFormField({
  //       value: searchText
  //     })
  //   };
  // }
})(StudiosFilterForm);
