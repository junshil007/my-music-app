import request from "../request";

// 搜索歌曲
const SearchSongs = ({ pageSize, start, keywords }) => {
    return request
        .get('/search', {
            params: {
                limit: pageSize,
                offset: start,
                keywords,
            },
        })
        .then((result) => {
            return result.data
        })
}

const GetAlbumInfo = ({
    id
}) =>  {
    return request
        .get('/album', {
            params: {
                id,
            },
        })
        .then((result) => {
            return result.data
        })
}

export default {
    SearchSongs,
    GetAlbumInfo
};