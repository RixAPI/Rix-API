package model

type Status string

const (
	StatusPublished Status = "published" // 发布
	StatusDraft     Status = "draft"     // 草稿
	StatusHidden    Status = "hidden"    // 隐藏
)

type Announcement struct {
	ID          int    `json:"id"`
	Tag         string `json:"tag"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
	Status      Status `json:"status" gorm:"type:varchar(16);default:draft"`
	ReadAuth    string `json:"read_auth"`
	CreatedAt   int64  `json:"created_at"`
	UpdatedAt   int64  `json:"updated_at"`
}

func GetUserAnnouncements(params *GenericParams, userLevel string) (*DataResult[Announcement], error) {
	var announcements []*Announcement
	db := DB.Where("status = ?", StatusPublished)
	db = db.Where("FIND_IN_SET(?, read_auth) > 0 OR read_auth IN (?)", userLevel, []string{"all", "*", ""})
	db = db.Order("created_at desc")
	return PaginateAndOrder(db, &params.PaginationParams, &announcements, nil)
}

func GetAnnouncementsAll(params *GenericParams) (*DataResult[Announcement], error) {
	var announcements []*Announcement
	db := DB.Order("created_at desc")
	if params.Status != "" {
		db = db.Where("status = ?", params.Status)
	}
	return PaginateAndOrder(db, &params.PaginationParams, &announcements, nil)
}
