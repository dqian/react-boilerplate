
import React from 'react';

const ReduxFormSelect: React.FC = (field: any) => (
  <div>
    <label>{field.label}</label>
    <select {...field.input} disabled={field.disabled} className="form-control">
      <option value="" disabled={true}>
        {field.placeHolder}
      </option>
      {field.datas.map((data: any, i: number) => {
        return (
          <option key={i} value={data.value}>
            {data.label}
          </option>
        );
      })}
    </select>
    {field.meta.touched && <p className="text-danger">{field.meta.error}</p>}
  </div>
);

export default ReduxFormSelect;