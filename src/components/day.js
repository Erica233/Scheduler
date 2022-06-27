import { Tag,  } from '@arco-design/web-react';
import React from 'react';
import Select from 'react-select';

// const options = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ];

const options = [
    { value: 'Sunday', label: 'Sunday' },
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
  ];

  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color={options.indexOf(value) > -1 ? value : 'gray'}
        closable={closable}
        onClose={onClose}
        style={{ margin: '2px 6px 2px 0' }}
      >
        {label}
      </Tag>
    );
  }

  const Day = () => {
    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          <Select
            style={{ maxWidth: 350, marginRight: 20 }}
            allowClear
            placeholder='Please Select'
            isMulti
            defaultValue={options.slice(0, 2)}
            options={options}
            renderTag={tagRender}
          />
        </div>
      </div>
    );
  };

export default Day;


