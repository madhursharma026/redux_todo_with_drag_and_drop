export const AddPost = (data) => {
    return {
        type: "AddPostData",
        payload: {
            id: new Date().getTime().toString(),
            data: data
        }
    }
}

export const DeletePostData = (id) => {
    return {
        type: "DeletePostData",
        payload: {
            id: id
        }
    }
}

export const RemoveAllPostData = () => {
    return {
        type: "RemoveAllPostData"
    }
}

export const UpdatePost = (updated_id, updated_value) => {
    return {
        type: "UpdatePost",
        payload: {
            updated_id: updated_id,
            updated_value: updated_value
        }
    }
}





