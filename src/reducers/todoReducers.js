const initialState = {
    list: []
}

const todoReducers = (state = initialState, action) => {
    switch (action.type) {
        case "AddPostData":
            const { id, data } = action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        data: data
                    }
                ]
            }
        case "DeletePostData":
            const newList = state.list.filter((elem) => elem.id !== action.payload.id);
            return {
                ...state,
                list: newList
            }
        case "RemoveAllPostData":
            return {
                ...state,
                list: []
            }
        case "UpdatePost":
            const UpdatedList = state.list.map(post=> post.id === action.payload.updated_id ? { ...post, data: action.payload.updated_value} : post)
            return {
                ...state,
                list: UpdatedList
            }
        default: return state;
    }
}

export default todoReducers;





