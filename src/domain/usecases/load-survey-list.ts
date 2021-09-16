import { SurveyModal } from '@/domain/models'

export interface LoadSurveyList {
  loadAll(): Promise<SurveyModal[]>
}
