package codersdk

import (
	"context"
	"encoding/json"
	"net/http"
)

var (
	// ExperimentVSCodeLocal enables a workspace button to launch VSCode
	// and connect using the local VSCode extension.
	ExperimentVSCodeLocal = "vscode_local"
	// ExperimentsAll includes all known experiments.
	ExperimentsAll = []string{
		ExperimentVSCodeLocal,
	}
)

func (c *Client) Experiments(ctx context.Context) ([]string, error) {
	res, err := c.Request(ctx, http.MethodGet, "/api/v2/experiments", nil)
	if err != nil {
		return []string{}, err
	}
	defer res.Body.Close()
	if res.StatusCode != http.StatusOK {
		return []string{}, readBodyAsError(res)
	}
	var exp []string
	return exp, json.NewDecoder(res.Body).Decode(&exp)
}
