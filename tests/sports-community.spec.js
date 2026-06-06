const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: '赛场', exact: true })).toBeVisible()
})

test('底部导航可访问五个核心页面', async ({ page }) => {
  const pages = [
    ['比赛', '比赛中心'],
    ['发现', '发现'],
    ['球队', '球队专区'],
    ['我的', '我的'],
    ['赛场', '赛场'],
  ]

  for (const [navLabel, heading] of pages) {
    await page.getByRole('button', { name: navLabel, exact: true }).click()
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
  }
})

test('首页支持运动筛选并可进入直播比赛中心', async ({ page }) => {
  const football = page.getByRole('button', { name: '足球', exact: true })
  await football.click()
  await expect(football).toHaveClass(/bg-lime/)

  const liveMatch = page.getByRole('button').filter({ hasText: '洛杉矶' }).filter({ hasText: '波士顿' })
  await expect(liveMatch).toHaveCount(1)
  await liveMatch.click()

  await expect(page.getByRole('heading', { name: '比赛中心', exact: true })).toBeVisible()
  await expect(page.getByText('12,638 在线', { exact: true })).toBeVisible()
})

test('比赛中心支持切换主客队看台', async ({ page }) => {
  await page.getByRole('button', { name: '比赛', exact: true }).click()

  await page.getByRole('button', { name: '主队看台', exact: true }).click()
  await expect(page.getByRole('heading', { name: '主队看台', exact: true })).toBeVisible()
  await expect(page.getByPlaceholder('在主队看台聊聊比赛...')).toBeVisible()

  await page.getByRole('button', { name: '客队看台', exact: true }).click()
  await expect(page.getByRole('heading', { name: '客队看台', exact: true })).toBeVisible()
  await expect(page.getByPlaceholder('在客队看台聊聊比赛...')).toBeVisible()
})

test('发现页帖子点赞支持增加与取消', async ({ page }) => {
  await page.getByRole('button', { name: '发现', exact: true }).click()
  const post = page.locator('article').filter({ hasText: '为什么阿森纳的右侧进攻今晚格外有效？' })
  const likeButton = post.getByRole('button').filter({ hasText: '328' })

  await likeButton.click()
  await expect(post.getByRole('button').filter({ hasText: '329' })).toBeVisible()
  await post.getByRole('button').filter({ hasText: '329' }).click()
  await expect(post.getByRole('button').filter({ hasText: '328' })).toBeVisible()
})

test('球队专区支持关注与取消关注', async ({ page }) => {
  await page.getByRole('button', { name: '球队', exact: true }).click()
  const followButton = page.getByRole('button', { name: '已关注', exact: true })

  await followButton.click()
  await expect(page.getByRole('button', { name: '关注', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '关注', exact: true }).click()
  await expect(page.getByRole('button', { name: '已关注', exact: true })).toBeVisible()
})

test('移动端页面不存在水平溢出', async ({ page }) => {
  const pageLabels = ['赛场', '比赛', '发现', '球队', '我的']

  for (const label of pageLabels) {
    await page.getByRole('button', { name: label, exact: true }).click()
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(hasOverflow).toBe(false)
  }
})
