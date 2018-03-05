import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const TagList = ({ tags, onAfterClose }) => (
  <div className="taglist">
    {tags.map((tag) => {
      const isLongTag = tag.length > 20;
      return (
        <Tag
          key={tag}
          afterClose={onAfterClose(tag)}
          className="taglist__tag"
          closable
          color="#3f7eff"
          name={tag}
          // onClose={onTagClose}
        >
          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
        </Tag>
      );
    })}
  </div>
);

TagList.propTypes = {
  onAfterClose: PropTypes.func.isRequired,
  tags: PropTypes.instanceOf(Array).isRequired,
};

export default TagList;
