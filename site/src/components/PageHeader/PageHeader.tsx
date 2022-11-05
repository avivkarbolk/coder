import { makeStyles } from "@material-ui/core/styles"
import { combineClasses } from "../../util/combineClasses"
import { Stack } from "../Stack/Stack"

export interface PageHeaderProps {
  actions?: JSX.Element
  className?: string
}

export const PageHeader: React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  children,
  actions,
  className,
}) => {
  const styles = useStyles({})

  return (
    <header
      className={combineClasses([styles.root, className])}
      data-testid="header"
    >
      <hgroup>{children}</hgroup>
      {actions && (
        <Stack direction="row" className={styles.actions}>
          {actions}
        </Stack>
      )}
    </header>
  )
}

export const PageHeaderTitle: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const styles = useStyles({})

  return <h1 className={styles.title}>{children}</h1>
}

export const PageHeaderSubtitle: React.FC<
  React.PropsWithChildren<{ condensed?: boolean }>
> = ({ children, condensed }) => {
  const styles = useStyles({
    condensed,
  })

  return <h2 className={styles.subtitle}>{children}</h2>
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },

  title: {
    fontSize: theme.spacing(3),
    fontWeight: 400,
    margin: 0,
    display: "flex",
    alignItems: "center",
    lineHeight: "140%",
  },

  subtitle: {
    fontSize: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontWeight: 400,
    display: "block",
    margin: 0,
    marginTop: ({ condensed }: { condensed?: boolean }) =>
      condensed ? theme.spacing(0.5) : theme.spacing(1),
  },

  actions: {
    marginLeft: "auto",

    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      marginLeft: "initial",
      width: "100%",
    },
  },
}))
