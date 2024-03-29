import { IconButton, Text, Wrap, WrapItem } from '@metafam/ds';
import { ExternalDaoLink } from 'components/Player/PlayerGuild';
import { PlayerHeroTile } from 'components/Player/Section/PlayerHeroTile';
import { ProfileSection } from 'components/Profile/ProfileSection';
import { GuildFragment } from 'graphql/autogen/types';
import React, { useMemo } from 'react';
import { FaDiscord, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import { getDAOLink } from 'utils/daoHelpers';

type Props = {
  guild: GuildFragment;
};

export const GuildLinks: React.FC<Props> = ({ guild }) => {
  const daoHrefs = useMemo(
    () =>
      guild.daos.map(
        (dao) => dao.url || getDAOLink(dao.network, dao.contractAddress),
      ),
    [guild],
  );

  const hasIconLink =
    guild.websiteUrl ||
    guild.discordInviteUrl ||
    guild.githubUrl ||
    guild.twitterUrl;

  return (
    <ProfileSection title="Links">
      {hasIconLink && (
        <Wrap mb={4}>
          {guild.websiteUrl ? (
            <WrapItem>
              <a href={guild.websiteUrl} target="_blank" rel="noreferrer">
                <IconButton
                  variant="outline"
                  aria-label="Discord Server"
                  size="lg"
                  colorScheme="blackAlpha"
                  icon={<FaGlobe />}
                />
              </a>
            </WrapItem>
          ) : null}
          {guild.discordInviteUrl ? (
            <WrapItem>
              <a href={guild.discordInviteUrl} target="_blank" rel="noreferrer">
                <IconButton
                  variant="outline"
                  aria-label="Discord Server"
                  size="lg"
                  bgColor="discord"
                  icon={<FaDiscord />}
                />
              </a>
            </WrapItem>
          ) : null}
          {guild.githubUrl ? (
            <WrapItem>
              <a href={guild.githubUrl} target="_blank" rel="noreferrer">
                <IconButton
                  variant="outline"
                  aria-label="Github"
                  size="lg"
                  colorScheme="github"
                  icon={<FaGithub />}
                />
              </a>
            </WrapItem>
          ) : null}
          {guild.twitterUrl ? (
            <WrapItem>
              <a href={guild.twitterUrl} target="_blank" rel="noreferrer">
                <IconButton
                  variant="outline"
                  aria-label="Twitter"
                  size="lg"
                  colorScheme="twitter"
                  icon={<FaTwitter />}
                />
              </a>
            </WrapItem>
          ) : null}
        </Wrap>
      )}
      <Wrap justify="space-between" w="full">
        {guild.daos?.map((dao, index) => (
          <WrapItem key={index}>
            <PlayerHeroTile title={dao.label || 'DAO'}>
              <ExternalDaoLink
                daoURL={daoHrefs[index]}
                _hover={{ textDecoration: 'underline' }}
              >
                <Text fontSize="sm">{dao.contractAddress}</Text>
              </ExternalDaoLink>
            </PlayerHeroTile>
          </WrapItem>
        ))}
      </Wrap>
    </ProfileSection>
  );
};
