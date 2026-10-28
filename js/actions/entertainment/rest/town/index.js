Cake.TownRestConfig = deepFreeze({
    home: {
        nap:   { name: '家里小憩', energy: 40, time: 60 },
        sleep: { name: '睡觉', time: 'next_day' },
    },
    park: {
        nap:   { name: '公园小憩', energy: 20, time: 30 },
    },
    // 👇 新增商业街和河边的小憩配置
    street: {
        nap:   { name: '街边小憩', energy: 15, time: 30 },
    },
    river: {
        nap:   { name: '河边小憩', energy: 25, time: 40 },
    },
});
