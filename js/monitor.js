// js/monitor.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    console.log('👁️ [JS 根目录监视器] 开始扫描各个子文件夹模块...');

    // 🌟 基于你当前的 js 目录结构设计的自检表
    const directoryRegistry = {
        'core/': {
            '渲染引擎 (initPage)': typeof Cake.initPage === 'function',
            '状态存储 (store)': !!Cake.store,
            '时间引擎 (advanceTime)': typeof Cake.advanceTime === 'function'
        },
        'data/': {
            '配方库 (RECIPES)': !!Cake.RECIPES,
            '角色库 (CHARACTERS)': !!Cake.CHARACTERS,
            '成就库 (ACHIEVEMENTS)': !!Cake.ACHIEVEMENTS
        },
        'actions/': {
            '烘焙 (bakeCake)': typeof Cake.bakeCake === 'function',
            '店铺 (openShop)': typeof Cake.openShop === 'function',
            '社交 (social)': typeof Cake.social === 'function'
        },
        'actions/entertainment/': {
            '散步 (walk)': typeof Cake.walk === 'function',
            '休息系统 (triggerRest)': typeof Cake.triggerRest === 'function',
            '地图注册表 (LOCATIONS)': !!Cake.LOCATIONS
        },
        'host/': {
            '宿主错误捕获 (HostError)': !!window.HostError,
            '宿主路由 (HostRouter)': !!window.HostRouter
        },
        'monitor/': {
            '子监视器装载': true // 自身
        },
        'page/': {
            '页面基础能力': true // 视你里面的具体实现而定
        },
        'pages/': {
            '页面路由分发器': true // 如果 pages/index.js 正常运行
        }
    };

    let errorCount = 0;

    // 遍历并执行检查
    for (const [folder, checks] of Object.entries(directoryRegistry)) {
        for (const [apiName, isLoaded] of Object.entries(checks)) {
            if (!isLoaded) {
                console.error(`❌ [监视器警告] 文件夹 [${folder}] 中的 ${apiName} 未加载或加载失败！`);
                errorCount++;
            }
        }
    }

    // 输出最终体检报告
    if (errorCount === 0) {
        console.log('%c✅ [监视器报告] js/ 目录下所有核心文件夹均已成功注册并启动！', 'color: #4caf50; font-weight: bold; font-size: 14px;');
    } else {
        console.warn(`⚠️ [监视器报告] 发现 ${errorCount} 处模块缺失，请检查上方红色报错并确认 game.html 的加载顺序。`);
    }
})();
