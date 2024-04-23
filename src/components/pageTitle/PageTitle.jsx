import React from 'react'
import "./PageTitle.css"
function PageTitle({title, description}) {
  return (
    <div className="page-title">
        <h2>{title}</h2>
        {description && description ? <p>{description}</p> : null}
    </div>
  )
}

export default PageTitle