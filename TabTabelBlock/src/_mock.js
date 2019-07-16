
import originTabelDataList from './dataBase/originTabelDataList'

export default {
    'POST /api/BLOCK_NAME/getTabelDataList': (req, res) => {
        const { condition: { file1 = '', file2 = '', }, current = 1, pageSize = 10
        } = req.body;
        let filterTabelDataList = originTabelDataList.filter(item => {
            if (file2 && item.type !== file2) return false
            return true
        })

        filterTabelDataList = filterTabelDataList.filter(item => {
            if (file1 && JSON.stringify(item).indexOf(file1) < 0) return false
            return true
        })
        //筛选
        const pageList = filterTabelDataList.filter((item, index) => index < pageSize * current && index >= pageSize * (current - 1))
        res.send({
            code: 200,
            message: '操作成功!',
            data: {
                total: filterTabelDataList.length,
                datalist: pageList
            }
        });
    },

    'POST /api/BLOCK_NAME/new': (req, res) => {
        res.send({
            code: 200,
            message: '操作成功!',
        });
    },

    'POST /api/BLOCK_NAME/edit': (req, res) => {
        res.send({
            code: 200,
            message: '编辑成功!',
        });
    },

    'GET /api/BLOCK_NAME/detail': (req, res) => {
        const { id } = req.query;
        res.send({
            code: 200,
            message: '编辑成功!',
            data: originTabelDataList.filter(item => item.id === id)[0]
        });
    }
}


