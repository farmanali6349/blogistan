import React from 'react'

function PageTitle({title, description}) {
  return (
    <div className="page-title">
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
  )
}

export default PageTitle