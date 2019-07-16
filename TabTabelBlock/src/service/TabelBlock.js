import request from 'umi-request';

//获取表格数据列表
export async function getTabelDataListApi(data) {
    return request.post('/api/BLOCK_NAME/getTabelDataList', { data });
}


// 删除
export async function deleteApi(data) {
    return request.post('/api/BLOCK_NAME/getTabelDataList', { data });
}

// 新增
export async function newApi(data) {
    return request.post('/api/BLOCK_NAME/new', { data });
}

// 编辑
export async function editApi(data) {
    return request.post('/api/BLOCK_NAME/edit', { data });
}

// 详情
export async function detailApi(id) {
    return request('/api/BLOCK_NAME/detail', { params: { id } });
}



