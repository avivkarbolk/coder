import { Feature, FeatureName } from "api/typesGenerated"
import { State } from "xstate"
import { EntitlementsContext, EntitlementsEvent } from "./entitlementsXService"

type EntitlementState = State<EntitlementsContext, EntitlementsEvent>

/**
 * @param hasLicense true if Enterprise edition
 * @param features record from feature name to feature object
 * @returns record from feature name whether to show the feature
 */
export const getFeatureVisibility = (
  hasLicense: boolean,
  features: Record<string, Feature>,
): Record<string, boolean> => {
  if (hasLicense) {
    const permissionPairs = Object.keys(features).map((feature) => {
      const { entitlement, limit, actual, enabled } = features[feature]
      const entitled = ["entitled", "grace_period"].includes(entitlement)
      const limitCompliant = limit && actual ? limit >= actual : true
      return [feature, entitled && limitCompliant && enabled]
    })
    return Object.fromEntries(permissionPairs)
  } else {
    return {}
  }
}

export const selectFeatureVisibility = (
  state: EntitlementState,
): Record<FeatureName, boolean> => {
  return getFeatureVisibility(
    state.context.entitlements.has_license,
    state.context.entitlements.features,
  )
}
