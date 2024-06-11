import { useState, useEffect, useRef } from 'react';
import css from './index.module.scss';
import { Card, Typography } from '@mui/material';
import { PrimaryButton } from 'berlin-common';

interface IProps {
  img: string;
  label: string | JSX.Element | JSX.Element[];
  children: string | JSX.Element | JSX.Element[];
  underline: boolean;
  open: any;
  // closeHandler?: () => void;
  name: string;
  setOpen: any;
  // isApply:boolean
}

function CustomDropDownAr({
  underline,
  img,
  label,
  children,
  open,
  setOpen,
  name,
}: IProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setOpen({});
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setOpen({
      [name]: !open[name],
    });
  };

  return (
    <>
      <div className={css.dropdownContainer}>
        <div onClick={handleToggle} className={css.scheduleInputFields}>
          <div>
            <img
              loading="lazy"
              src={img}
              className={css.scheduleIcons}
              alt={label?.toString()}
            />
          </div>
          <div
            style={{
              textDecoration: underline ? 'underline' : 'none',
            }}
            className={css.scheduleLabel}
          >
            {label}
          </div>
        </div>
        {open[name] && (
          <Card style={{ maxWidth: '698px' }} className={css.card} ref={divRef}>
            {children}
            {/* {
              isApply &&
              <PrimaryButton label={"Apply"}>

              </PrimaryButton>
            } */}
          </Card>
        )}
      </div>
    </>
  );
}

export default CustomDropDownAr;
