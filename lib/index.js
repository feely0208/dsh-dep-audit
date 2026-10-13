import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';

export const { name, inject, apply } = createPlugin({
  name: 'dep-audit',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/dep-audit.md',
  binFile: 'bin/cli.mjs',
  description: '检查依赖树的投毒与风险面：装包即执行的脚本、过宽版本、非 registry 来源',
  whenToUse: 'TODO：写清什么时候该用（用户会说的话也列上）',
});
