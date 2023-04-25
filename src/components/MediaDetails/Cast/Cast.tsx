import { apiCastProfileImgUrl } from '../../../const/apiCastProfileImgUrl'
import { ActorInfoDataType, MediaType } from '../../../types'
import styles from './Cast.module.scss'

interface CastProps {
  castData: ActorInfoDataType[]
  mediaType: MediaType
}

const Cast: React.FC<CastProps> = ({ castData, mediaType }) => {
  if (!castData || castData.length === 0) {
    return null
  }

  return (
    <section className={styles.castContainer}>
      <h3 className={styles.castTitle}>The Cast</h3>
      <div className={styles.cast}>
        {/* show only first 8 cast members */}
        {castData?.slice(0, 8).map((person: ActorInfoDataType, index: number) => (
          <div className={styles.castCard} key={person.id}>
            <img src={`${apiCastProfileImgUrl}${person.profile_path}`} alt='' />
            <div className={styles.roleContainer}>
              <h4 className={styles.actorName}>{person.name}</h4>
              <p className={styles.characterName}>
                {mediaType === MediaType.MOVIE
                  ? person.character
                  : person?.roles?.map((role, index) =>
                      index !== person.roles.length - 1
                        ? role.character + ', '
                        : role.character
                    )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Cast
