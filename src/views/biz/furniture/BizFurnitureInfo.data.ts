import { BasicColumn } from '/@/components/Table';
import { h } from 'vue';
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
import { createImgPreview } from '/@/components/Preview/index';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '颜色描述',
    align: "center",
    dataIndex: 'color'
  },
  {
    title: '家具名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '楼栋号',
    align: "center",
    dataIndex: 'buildingTypedictText'
  },
  {
    title: '楼层(层)',
    align: "center",
    dataIndex: 'layerNum'
  },
  {
    title: '厂家描述',
    align: "center",
    dataIndex: 'factory'
  },
  {
    title: '家具图片',
    align: "center",
    dataIndex: 'image',
    customRender: ({ text }) => {
      if (!text) return '';
      const rawList: string[] = Array.isArray(text)
        ? text
        : String(text)
            .split(',')
            .map((u) => u.trim())
            .filter((u) => !!u);
      if (rawList.length === 0) return '';
      const fullList = rawList.map((u) => getFileAccessHttpUrl(u));
      const thumbs = fullList.slice(0, 3);
      return h(
        'div',
        {
          style: {
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        thumbs.map((src, index) =>
          h('img', {
            src,
            style: {
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px',
              cursor: 'pointer',
            },
            onClick: () =>
              createImgPreview({
                imageList: fullList,
                index,
              }),
          }),
        ),
      );
    },
  },
  {
    title: '位置描述',
    align: "center",
    dataIndex: 'area'
  },
  {
    title: '规格描述',
    align: "center",
    dataIndex: 'spec'
  },
  {
    title: '特殊项描述',
    align: "center",
    dataIndex: 'special'
  },
  {
    title: '家具类型',
    align: "center",
    dataIndex: 'furniture'
  },
];

// 高级查询数据
export const superQuerySchema = {
  color: {title: '颜色描述',order: 0,view: 'text', type: 'string',},
  name: {title: '家具名称',order: 1,view: 'text', type: 'string',},
  buildingType: {title: '楼栋号',order: 2,view: 'text', type: 'string',},
  layerNum: {title: '楼层',order: 3,view: 'text', type: 'string',},
  factory: {title: '厂家描述',order: 4,view: 'text', type: 'string',},
  image: {title: '家具图片',order: 5,view: 'text', type: 'string',},
  area: {title: '位置描述',order: 6,view: 'text', type: 'string',},
  spec: {title: '规格描述',order: 7,view: 'text', type: 'string',},
  special: {title: '特殊项描述',order: 8,view: 'text', type: 'string',},
  furniture: {title: '家具类型',order: 9,view: 'text', type: 'string',},
};
