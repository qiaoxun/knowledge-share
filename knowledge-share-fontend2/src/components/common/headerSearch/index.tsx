import React, { FC } from 'react'
import { Input } from 'antd'

interface Props extends ReduxProps {}

const HeaderSearch: FC<Props> = () => {
  const onSearch = (value) => {
    console.log(value)
  }

  return (
    <div className="fr" style={{ display: 'inline-block' }}>
      <Input.Search
        placeholder="Input to Search"
        style={{ width: '300px' }}
        onSearch={onSearch}
      />
    </div>
  )
}

export default HeaderSearch
