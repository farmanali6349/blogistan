import React from 'react'
import { CategoryInput, CreateCategory } from '../index'

function Categories({}) {
    return (
        <>
            <CategoryInput label="Undefined" value="Undefined" $id="This is $id"/>
            <CreateCategory />
        </>
    )
}

export default Categories