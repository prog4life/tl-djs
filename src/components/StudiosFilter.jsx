import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _throttle from 'lodash.throttle';
import { Form, Input } from 'antd';
import PriceSlider from 'components/PriceSlider';
import TagList from 'components/TagList';

const FormItem = Form.Item;
const { Search } = Input;

// TODO: changeSearchTextDebounced = _debounce(this.handleSearchChange(e), 500);

class StudiosFilterForm extends Component {
  static propTypes = {
    addStudiosFilterTag: PropTypes.func.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    removeStudiosFilterTag: PropTypes.func.isRequired,
    setStudiosFilterText: PropTypes.func.isRequired,
    setStudiosPriceRange: PropTypes.func.isRequired,
    tags: PropTypes.instanceOf(Array).isRequired,
  }
  setStudiosFilterTextThrottled = _throttle(
    this.props.setStudiosFilterText,
    1000,
    // NOTE: trailing causes excess setting of field value on search event
    { leading: false, trailing: true }
  )
  handleTagAfterClose = tagName => () => {
    const { removeStudiosFilterTag } = this.props;
    removeStudiosFilterTag(tagName);
  }
  handleSliderAfterChange = ([minPrice, maxPrice]) => {
    const { setStudiosPriceRange } = this.props;
    console.log('slider value: ', minPrice, maxPrice);
    setStudiosPriceRange(minPrice, maxPrice);
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
    const { form: { getFieldDecorator }, tags, initialPriceRange } = this.props;
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
        <PriceSlider
          initial={initialPriceRange}
          onAfterChange={this.handleSliderAfterChange}
        />
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange: _throttle(
    ({ setStudiosFilterText }, changedFields) =>
    // console.log('changedFields.search.value: ', changedFields.search.value);
      setStudiosFilterText(changedFields.search.value),
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
