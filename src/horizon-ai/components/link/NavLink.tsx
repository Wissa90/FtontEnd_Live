"use client";
import { Link, LinkProps } from "react-router-dom";
import { CSSProperties, PropsWithChildren, useMemo } from "react";

export type NavLinkProps = LinkProps &
  PropsWithChildren & {
    styles?: CSSProperties;
    borderRadius?: CSSProperties["borderRadius"];
  };

function NavLink({ children, styles, borderRadius, ...props }: NavLinkProps) {
  const memoizedStyles = useMemo(
    () => ({
      ...styles,
      borderRadius,
    }),
    [styles, borderRadius],
  );

  return (
    <Link style={memoizedStyles} {...props}>
      {children}
    </Link>
  );
}

export default NavLink;
