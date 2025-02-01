import React from 'react'

function PageTitle({ title, description }) {
    return (
        <main className="page-title">
            <div className="main-container">
                <h2>{title}</h2>
                {description && (
                    <p>{description}</p>
                )}
            </div>
        </main>
    )
}

export default PageTitle