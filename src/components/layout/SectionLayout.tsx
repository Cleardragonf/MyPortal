import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Collapse,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import {
    useLocation,
    useNavigate,
} from 'react-router-dom';

const DEFAULT_DRAWER_WIDTH = 280;
const DEFAULT_COLLAPSED_WIDTH = 72;

export interface SectionNavigationItem {
    label: string;

    /*
     * "to" is optional because a parent menu may only
     * expand and collapse its children.
     */
    to?: string;

    icon?: ReactNode;
    end?: boolean;

    /*
     * Supports unlimited nested menu levels.
     */
    children?: readonly SectionNavigationItem[];

    /*
     * Item is hidden when the user does not have
     * every required permission.
     */
    requiredPermissions?: readonly string[];

    disabled?: boolean;
}

interface SectionLayoutProps {
    title: string;
    userDisplayName?: string;
    navigationItems: readonly SectionNavigationItem[];
    onLogout?: () => void | Promise<void>;
    children: ReactNode;

    userPermissions?: readonly string[];
    homePath?: string;
    homeLabel?: string;

    drawerWidth?: number;
    collapsedDrawerWidth?: number;
    defaultCollapsed?: boolean;
}

interface NavigationItemProps {
    item: SectionNavigationItem;
    depth: number;
    collapsed: boolean;
    onNavigate: () => void;
    onExpandSidebar: () => void;
}

const ApplicationFrame = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const MainContent = styled('main')({
    flexGrow: 1,
    minWidth: 0,
});

const PageContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
}));

function isRouteActive(
    pathname: string,
    item: SectionNavigationItem,
): boolean {
    if (!item.to) {
        return false;
    }

    if (item.end) {
        return pathname === item.to;
    }

    /*
     * Prevent "/" from matching every route.
     */
    if (item.to === '/') {
        return pathname === '/';
    }

    return (
        pathname === item.to ||
        pathname.startsWith(`${item.to}/`)
    );
}

function containsActiveRoute(
    pathname: string,
    item: SectionNavigationItem,
): boolean {
    if (isRouteActive(pathname, item)) {
        return true;
    }

    return (
        item.children?.some((child) =>
            containsActiveRoute(pathname, child),
        ) ?? false
    );
}

function filterNavigationItems(
    items: readonly SectionNavigationItem[],
    userPermissions?: readonly string[],
): SectionNavigationItem[] {
    return items.reduce<SectionNavigationItem[]>(
        (filteredItems, item) => {
            /*
             * When userPermissions is undefined, this is an
             * open/public section, so do not filter navigation.
             *
             * When an array is supplied, enforce permissions.
             */
            const hasRequiredPermissions =
                userPermissions === undefined ||
                !item.requiredPermissions?.length ||
                item.requiredPermissions.every((permission) =>
                    userPermissions.includes(permission),
                );

            if (!hasRequiredPermissions) {
                return filteredItems;
            }

            const filteredChildren = item.children
                ? filterNavigationItems(
                      item.children,
                      userPermissions,
                  )
                : undefined;

            if (
                item.children &&
                !item.to &&
                filteredChildren?.length === 0
            ) {
                return filteredItems;
            }

            filteredItems.push({
                ...item,
                children: filteredChildren,
            });

            return filteredItems;
        },
        [],
    );
}

function RecursiveNavigationItem({
    item,
    depth,
    collapsed,
    onNavigate,
    onExpandSidebar,
}: NavigationItemProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const hasChildren = Boolean(item.children?.length);

    const active =
        isRouteActive(location.pathname, item);

    const descendantActive =
        item.children?.some((child) =>
            containsActiveRoute(
                location.pathname,
                child,
            ),
        ) ?? false;

    const [expanded, setExpanded] =
        useState(descendantActive);

    /*
     * Automatically expand a parent when one of its
     * child routes becomes active.
     */
    useEffect(() => {
        if (descendantActive) {
            setExpanded(true);
        }
    }, [descendantActive]);

    function handleClick() {
        if (item.disabled) {
            return;
        }

        if (hasChildren) {
            if (collapsed) {
                onExpandSidebar();
                setExpanded(true);
                return;
            }

            setExpanded((current) => !current);
            return;
        }

        if (item.to) {
            navigate(item.to);
            onNavigate();
        }
    }

    const navigationButton = (
        <ListItemButton
            selected={active || descendantActive}
            disabled={item.disabled}
            onClick={handleClick}
            aria-expanded={
                hasChildren
                    ? expanded
                    : undefined
            }
            sx={{
                minHeight: 48,
                px: collapsed ? 1.5 : 2,
                pl: collapsed
                    ? 1.5
                    : 2 + depth * 2,
                justifyContent: collapsed
                    ? 'center'
                    : 'initial',
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
            }}
        >
            {item.icon && (
                <ListItemIcon
                    sx={{
                        minWidth: collapsed ? 0 : 40,
                        justifyContent: 'center',
                    }}
                >
                    {item.icon}
                </ListItemIcon>
            )}

            {!collapsed && (
                <ListItemText
                    primary={item.label}
                    slotProps={{
                        primary: {
                            noWrap: true,
                            sx: {
                                fontWeight:
                                    active || descendantActive
                                        ? 700
                                        : 500,
                            },
                        },
                    }}
                />
            )}

            {hasChildren &&
                !collapsed &&
                (expanded
                    ? <ExpandLessIcon />
                    : <ExpandMoreIcon />)}
        </ListItemButton>
    );

    return (
        <>
            {collapsed ? (
                <Tooltip
                    title={item.label}
                    placement="right"
                >
                    {navigationButton}
                </Tooltip>
            ) : (
                navigationButton
            )}

            {hasChildren && (
                <Collapse
                    in={expanded && !collapsed}
                    timeout="auto"
                    unmountOnExit
                >
                    <List disablePadding>
                        {item.children?.map(
                            (child, index) => (
                                <RecursiveNavigationItem
                                    key={
                                        child.to ??
                                        `${item.label}-${child.label}-${index}`
                                    }
                                    item={child}
                                    depth={depth + 1}
                                    collapsed={collapsed}
                                    onNavigate={
                                        onNavigate
                                    }
                                    onExpandSidebar={
                                        onExpandSidebar
                                    }
                                />
                            ),
                        )}
                    </List>
                </Collapse>
            )}
        </>
    );
}

export function SectionLayout({
    title,
    userDisplayName,
    navigationItems,
    onLogout,
    children,
    userPermissions,
    homePath = '/',
    homeLabel = 'Portal',
    drawerWidth = DEFAULT_DRAWER_WIDTH,
    collapsedDrawerWidth =
        DEFAULT_COLLAPSED_WIDTH,
    defaultCollapsed = false,
}: SectionLayoutProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const displayName = userDisplayName ?? 'User';

    const isMobile = useMediaQuery(
        theme.breakpoints.down('md'),
    );

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const [desktopCollapsed, setDesktopCollapsed] =
        useState(defaultCollapsed);

    const visibleNavigationItems = useMemo(
        () =>
            filterNavigationItems(
                navigationItems,
                userPermissions,
            ),
        [navigationItems, userPermissions],
    );

    const effectiveDrawerWidth =
        desktopCollapsed
            ? collapsedDrawerWidth
            : drawerWidth;

    function closeMobileNavigation() {
        if (isMobile) {
            setMobileOpen(false);
        }
    }

    function renderNavigation(
        collapsed: boolean,
    ) {
        return (
            <>
                <Toolbar />

                <Box
                    component="nav"
                    aria-label={`${title} navigation`}
                    sx={{
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        py: 1.5,
                    }}
                >
                    <List disablePadding>
                        {visibleNavigationItems.map(
                            (item, index) => (
                                <RecursiveNavigationItem
                                    key={
                                        item.to ??
                                        `${item.label}-${index}`
                                    }
                                    item={item}
                                    depth={0}
                                    collapsed={collapsed}
                                    onNavigate={
                                        closeMobileNavigation
                                    }
                                    onExpandSidebar={() =>
                                        setDesktopCollapsed(
                                            false,
                                        )
                                    }
                                />
                            ),
                        )}
                    </List>
                </Box>
            </>
        );
    }

    return (
        <ApplicationFrame>
            <AppBar
                position="fixed"
                elevation={1}
                sx={{
                    zIndex: (currentTheme) =>
                        currentTheme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ gap: 1 }}>
                    <Tooltip
                        title={
                            isMobile
                                ? 'Open navigation'
                                : desktopCollapsed
                                  ? 'Expand navigation'
                                  : 'Collapse navigation'
                        }
                    >
                        <IconButton
                            color="inherit"
                            edge="start"
                            aria-label={
                                isMobile
                                    ? 'Open navigation'
                                    : 'Toggle navigation'
                            }
                            onClick={() => {
                                if (isMobile) {
                                    setMobileOpen(
                                        (current) =>
                                            !current,
                                    );
                                } else {
                                    setDesktopCollapsed(
                                        (current) =>
                                            !current,
                                    );
                                }
                            }}
                        >
                            {!isMobile &&
                            !desktopCollapsed ? (
                                <ChevronLeftIcon />
                            ) : (
                                <MenuIcon />
                            )}
                        </IconButton>
                    </Tooltip>

                    <Button
                        color="inherit"
                        startIcon={
                            <HomeOutlinedIcon />
                        }
                        onClick={() =>
                            navigate(homePath)
                        }
                        aria-label={`Go to ${homeLabel}`}
                        sx={{
                            display: {
                                xs: 'none',
                                sm: 'inline-flex',
                            },
                        }}
                    >
                        {homeLabel}
                    </Button>

                    <Typography
                        variant="h6"
                        component="div"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            fontWeight: 800,
                        }}
                    >
                        {title}
                    </Typography>

                    <Tooltip
                        title={`Signed in as ${displayName}`}
                    >
                        <Avatar
                            sx={{
                                width: 34,
                                height: 34,
                            }}
                        >
                            {displayName
                                .charAt(0)
                                .toUpperCase()}
                        </Avatar>
                    </Tooltip>

                    {onLogout && (
                        <Button
                            color="inherit"
                            startIcon={
                                <LogoutOutlinedIcon />
                            }
                            onClick={() =>
                                void onLogout()
                            }
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'inline-flex',
                                },
                            }}
                        >
                            Sign out
                        </Button>
                    )}

                {onLogout && (
                    <Tooltip title="Sign out">
                        <IconButton
                            color="inherit"
                            aria-label="Sign out"
                            onClick={() =>
                                void onLogout()
                            }
                            sx={{
                                display: {
                                    xs: 'inline-flex',
                                    sm: 'none',
                                },
                            }}
                        >
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                )}
                </Toolbar>
            </AppBar>

            {/* Mobile navigation */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() =>
                    setMobileOpen(false)
                }
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {
                        xs: 'block',
                        md: 'none',
                    },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {renderNavigation(false)}
            </Drawer>

            {/* Desktop navigation */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {
                        xs: 'none',
                        md: 'block',
                    },
                    width: effectiveDrawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    transition:
                        theme.transitions.create(
                            'width',
                            {
                                easing:
                                    theme.transitions
                                        .easing.sharp,
                                duration:
                                    theme.transitions
                                        .duration
                                        .enteringScreen,
                            },
                        ),
                    '& .MuiDrawer-paper': {
                        width:
                            effectiveDrawerWidth,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition:
                            theme.transitions.create(
                                'width',
                                {
                                    easing:
                                        theme.transitions
                                            .easing.sharp,
                                    duration:
                                        theme.transitions
                                            .duration
                                            .enteringScreen,
                                },
                            ),
                    },
                }}
            >
                {renderNavigation(
                    desktopCollapsed,
                )}
            </Drawer>

            <MainContent>
                {/*
                 * Spacer so content begins below the
                 * fixed AppBar.
                 */}
                <Toolbar />

                <PageContainer maxWidth="lg">
                    {children}
                </PageContainer>
            </MainContent>
        </ApplicationFrame>
    );
}
