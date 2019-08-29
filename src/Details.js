import React from 'react';
import { stringify } from 'querystring';

const Details = (props) => {
  return <pre><code>{JSON.stringify(props,null,4)}</code></pre>;
};

export default Details;