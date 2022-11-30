import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Box from 'components/Box/Box';
import Button from 'components/button/Button';
import Chip from 'components/Chip/Chip';
import CircleProgress from 'components/circleProgress/CircleProgress';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import Stack from 'components/stack/Stack';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import networkMappings from 'utils/helpers/networkMappings';
import wagmiChainNameMappings from 'utils/helpers/wagmiChainNameMappings';
import { useNetwork } from 'wagmi';
import { Testament } from '../../utils/Types';
import UILoading from '../UI/Loading';

type Props = {
  overrideClaim?: boolean;
  testament: Testament;
  updateDialogContent: (
    // eslint-disable-next-line no-unused-vars
    caller: 'Complete Multisig' | 'Inheritance Complete'
  ) => void;
  setActiveClaim: Dispatch<
    SetStateAction<'Inheritance Plan' | 'Backup Wallet' | undefined>
  >;
};

const InheritancePlan = ({
  overrideClaim,
  testament,
  updateDialogContent,
  setActiveClaim,
}: Props) => {
  const { chain } = useNetwork();

  const networkName =
    wagmiChainNameMappings[chain?.name as keyof typeof wagmiChainNameMappings];

  const networkMapping =
    networkMappings[networkName as keyof typeof networkMappings];

  const beneficiariesAmount = testament?.beneficiaries.length;
  const tokens = testament?.tokens;

  const renderComponent = () => {
    if (!beneficiariesAmount || !tokens) {
      return <UILoading width={150} height={150} />;
    }

    return (
      <Box className="w-full">
        <Stack direction="row" className="justify-between">
          <Stack direction="row" className="gap-2">
            <div className="relative h-[96px] w-[86px] shrink-0">
              <Image
                src="/icons/inheritance-plan.png"
                alt="protection"
                objectFit="contain"
                layout="fill"
              />
            </div>
            <div className="space-y-2">
              <h5 className="h4">Inheritance Plan</h5>
              <span className="text-xs text-blue-gray-light">Active</span>
            </div>
          </Stack>
          <div className="space-y-2">
            <span className="text-xs text-blue-gray-light">Network</span>
            <Stack direction="row" className="gap-1">
              <Image
                src={networkMapping.route}
                alt={chain?.name}
                width={20}
                height={20}
              />
              <span></span>
              <span className="capitalize">{networkName}</span>
            </Stack>
          </div>
        </Stack>
        <HorizontalRule />
        <Stack className="mt-10 !gap-10">
          <p>
            This Inheritance of Peace plan is the safe way to transfer the
            assets of a loved one who left you. If you are new to Web3, we
            recommend these{' '}
            <Link href={''}>
              <a className="text-purple-700">
                guides and tutorials in our Help Center
              </a>
            </Link>
            , before you begin the process of claiming your funds.
          </p>
          <Stack
            direction="row"
            className={clsx(
              'justify-between [&>div>span:first-of-type]:text-sm',
              '[&>div>span:first-of-type]:text-blue-gray [&>div:first-of-type]:!gap-2',
              '[&>div>span:nth-child(2)]:text-center'
            )}
          >
            <Stack>
              <span>Total Wealth</span>
              <span>$10,000</span>
            </Stack>
            <Stack>
              <div className="flex gap-1">
                <span className="text-sm text-blue-gray">
                  Heir address wallet
                </span>
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  onClick={() => {}}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <span>0x47E...0d926</span>
            </Stack>
            <Stack>
              <span>NFTs</span>
              <span>0</span>
            </Stack>
            <Stack>
              <span>Tokens</span>
              <span>{tokens.length ?? 0}</span>
            </Stack>
            <Button
              text={'View all'}
              variant="basic"
              className="rounded-md px-4 py-1.5 [&>span]:text-sm"
            />
          </Stack>
          <p>
            Unlock this inheritance plan and transfer the funds to the heirs
            completing the multisig process with the {beneficiariesAmount}{' '}
            Protectors.
          </p>
          <Stack direction="row" className="!items-start justify-between">
            <CircleProgress
              className="shrink-0"
              progress={
                overrideClaim
                  ? 100
                  : ((beneficiariesAmount - 1) * 100) / beneficiariesAmount
              }
            >
              <div className="relative h-[91px] w-[91px] shrink-0 ">
                <Image
                  src="/icons/vault.png"
                  alt="vault"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-sm">Multisig Protection</span>
              <span className="text-sm text-purple-900">
                {beneficiariesAmount} Protectors
              </span>
            </CircleProgress>
            <div>
              <div>
                <span className="text-purple-900">
                  {beneficiariesAmount - 1 ?? '---'}/
                  {beneficiariesAmount ?? '---'} Protectors already sign!
                </span>
                <Stack direction="row" className="mt-4 flex-wrap">
                  {[...Array(beneficiariesAmount)].map((_, i) => {
                    return (
                      <React.Fragment key={i}>
                        <div className="relative">
                          <Box
                            gradient={i + 1 > beneficiariesAmount - 1}
                            className={clsx(
                              'flex h-[75px] w-[75px] items-center justify-center rounded-full drop-shadow-none',
                              '[&>div]:rounded-full [&>div]:p-0'
                            )}
                          >
                            <div
                              className={clsx(
                                'flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white'
                              )}
                            >
                              <div className="relative h-16 w-16 shrink-0 rounded-full">
                                <Image
                                  src="/images/astronaut.png"
                                  layout="fill"
                                  alt="astronaut"
                                />
                              </div>
                            </div>
                          </Box>
                          {!overrideClaim && i + 1 > beneficiariesAmount - 1 ? (
                            <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-gray-400"></div>
                          ) : (
                            <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-white">
                              <FontAwesomeIcon
                                icon={faCircleCheck}
                                size="xl"
                                style={{
                                  color: '#009900',
                                }}
                              />
                            </span>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </Stack>
              </div>
            </div>
            {beneficiariesAmount - 1 === beneficiariesAmount ? (
              <Chip variant="success" text="Approved" className="mt-12" />
            ) : (
              <Button
                text={'Complete Multisig'}
                variant={'basic'}
                size="sm"
                className="mt-12"
                disabled={beneficiariesAmount - 1 === beneficiariesAmount}
                onClick={() =>
                  beneficiariesAmount - 1 === beneficiariesAmount
                    ? null
                    : updateDialogContent('Complete Multisig')
                }
              />
            )}
          </Stack>
          <Stack direction="row" className="justify-center">
            <Button
              text="Back"
              variant="gradientBorder"
              size="sm"
              className="!p-0.5"
              onClick={() => setActiveClaim(undefined)}
            />
            <Button
              disabled={
                overrideClaim
                  ? false
                  : beneficiariesAmount - 1 !== beneficiariesAmount
              }
              text="Claim Now"
              variant="fancy"
              size="sm"
              className="!p-1"
              onClick={() =>
                overrideClaim
                  ? updateDialogContent('Inheritance Complete')
                  : beneficiariesAmount - 1 !== beneficiariesAmount
                  ? null
                  : updateDialogContent('Inheritance Complete')
              }
            />
          </Stack>
        </Stack>
      </Box>
    );
  };

  return renderComponent();
};

export default InheritancePlan;
