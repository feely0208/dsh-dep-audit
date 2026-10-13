# 依赖投毒与风险

检查依赖树的**投毒面与不确定性** —— 装包即执行的脚本、过宽版本、非 registry 来源。

## 一、何时用

- `npm install` 之后、提交依赖变更前
- 引入新依赖时
- 发布产物前
- 安全审查、供应链合规检查时

## 二、它查什么

| 级别 | 查什么 | 为什么危险 |
|---|---|---|
| 🔴 高 | 依赖带 **install/postinstall 脚本** | 装包即执行任意代码，**不需要你 import** |
| 🟡 中 | 没有 lockfile | 每次装到的版本可能不同，无法复现 |
| 🟡 中 | 版本过宽（`*` / `latest`）| 把「装哪个版本」交给上游 |
| 🟡 中 | 非 registry 来源（`git+` / `http://`）| 绕过完整性校验；http 明文传输 |
| 🟢 低 | `>=x.y.z` 无上界 | 跨大版本时引入 breaking change |

## 三、怎么用

```bash
<cli 路径>                 # 扫当前目录
<cli 路径> --demo          # 看检出效果
<cli 路径> --html r.html   # HTML 报告
```

**退出码 1 = 有高危命中**。

## 四、判据来源

- npm Docs — scripts（preinstall/install/postinstall）
- 近年 npm 投毒事件：**event-stream、ua-parser-js、node-ipc、colors/faker**
  —— 均通过**生命周期脚本**执行任意代码
- npm Docs — package-lock.json / semver ranges / 依赖协议

## 五、边界

- **带 install 脚本 ≠ 恶意**。`esbuild`、`sharp`、`puppeteer` 这类需要编译原生的包**必须有**脚本，
  已在 `allow` 默认白名单里。剩下报出来的，需要你人工确认该不该有。
- **不查漏洞库**：本工具不联网、不查 CVE，不做版本漏洞比对。
- **不做包名相似度检测**（typosquat）：需要知名包清单，且误报率高，暂不纳入。
- 只在 `node_modules` 存在时能查脚本；没装依赖时只报「没 lockfile」这类结构问题。

## 六、覆盖面

5 条规则，覆盖依赖树的主要投毒面与不确定性。
不覆盖：CVE 漏洞、包名仿冒、维护者信誉、依赖深度与体积。
