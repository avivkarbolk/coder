import { Page } from "@playwright/test"

export const buttons = {
  starterTemplates: "Starter templates",
  dockerTemplate: "Develop in Docker",
  useTemplate: "Use template",
  createTemplate: "Create template",
  createWorkspace: "Create workspace",
  submitCreateWorkspace: "Create workspace",
  stopWorkspace: "Stop",
  startWorkspace: "Start",
}

export const clickButton = async (page: Page, name: string): Promise<void> => {
  await page.getByRole("button", { name, exact: true }).click()
}

export const fillInput = async (
  page: Page,
  label: string,
  value: string,
): Promise<void> => {
  await page.fill(`text=${label}`, value)
}
